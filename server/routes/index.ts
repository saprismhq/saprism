import type { Express } from "express";
import { createServer, type Server } from "http";
import { Container } from "../container/Container";
import clientRoutes from "./clients";

import { UserController } from "../controllers/UserController";
import { MeetingController } from "../controllers/MeetingController";
import { NoteController } from "../controllers/NoteController";
import { AIController } from "../controllers/AIController";
import { CrmController } from "../controllers/CrmController";
import { StatusController } from "../controllers/StatusController";

import { IUserService } from "../core/UserService";
import { IMeetingService } from "../core/MeetingService";
import { INoteService } from "../core/NoteService";
import { ICoachingService } from "../core/CoachingService";
import { ICrmSyncService } from "../core/CrmSyncService";
import { IAuthenticationService } from "../core/AuthenticationService";
import { setupWebSocketServer } from "./websocket";
import { initializeCacheService } from "../services/cache";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize cache service before anything else
  initializeCacheService();
  
  // Get dependencies from container
  const container = Container.getInstance();
  
  const authService = container.get<IAuthenticationService>('AuthenticationService');
  const userService = container.get<IUserService>('UserService');
  const meetingService = container.get<IMeetingService>('MeetingService');
  const noteService = container.get<INoteService>('NoteService');
  const coachingService = container.get<ICoachingService>('CoachingService');
  const crmSyncService = container.get<ICrmSyncService>('CrmSyncService');

  // Setup authentication
  await authService.setupAuth(app);
  const isAuthenticated = authService.getAuthenticatedMiddleware();

  // Initialize controllers
  const userController = new UserController(userService);
  const meetingController = new MeetingController(meetingService);
  const noteController = new NoteController(noteService, meetingService);
  const aiController = new AIController(noteService, meetingService, coachingService);
  const crmController = new CrmController(meetingService, noteService, crmSyncService);
  const statusController = new StatusController();

  // Health check endpoint for load balancer
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
  });

  // User routes
  app.get('/api/auth/user', isAuthenticated, (req, res) => userController.getCurrentUser(req, res));

  // Meeting routes
  app.post('/api/meetings', isAuthenticated, (req, res) => meetingController.createMeeting(req, res));
  app.get('/api/meetings', isAuthenticated, (req, res) => meetingController.getMeetings(req, res));
  app.get('/api/meetings/:id', isAuthenticated, (req, res) => meetingController.getMeetingById(req, res));
  app.delete('/api/meetings/:id', isAuthenticated, (req, res) => meetingController.deleteMeeting(req, res));

  // Note routes
  app.get('/api/notes', isAuthenticated, (req, res) => noteController.getNotesByMeeting(req, res));
  app.post('/api/notes', isAuthenticated, (req, res) => noteController.createNote(req, res));
  app.patch('/api/notes/:id', isAuthenticated, (req, res) => noteController.updateNote(req, res));

  // AI routes
  app.post('/api/ai/analyze', isAuthenticated, (req, res) => aiController.analyzeNotes(req, res));
  app.post('/api/ai/coaching', isAuthenticated, (req, res) => aiController.generateCoachingSuggestions(req, res));
  app.post('/api/ai/chat', isAuthenticated, (req, res) => aiController.handleChat(req, res));
  app.post('/api/ai/methodology', isAuthenticated, (req, res) => aiController.generateMethodologyInsights(req, res));

  // CRM routes
  app.get('/api/crm/status', isAuthenticated, (req, res) => crmController.getCrmStatus(req, res));
  app.post('/api/crm/sync', isAuthenticated, (req, res) => crmController.syncToCrm(req, res));

  // Status routes
  app.get('/api/status', isAuthenticated, (req, res) => statusController.getSystemStatus(req, res));

  // Client routes
  app.use('/api/clients', clientRoutes);

  // Session routes (import inline to avoid module dependency issues)
  const { registerSessionRoutes } = await import('./sessions');
  registerSessionRoutes(app);

  const httpServer = createServer(app);
  
  // Setup WebSocket server for real-time transcription
  setupWebSocketServer(httpServer);
  
  return httpServer;
}