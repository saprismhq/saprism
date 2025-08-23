import { jest, describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { registerRoutes } from '../../server/routes/index';
import { Container } from '../../server/container/Container';

// Mock external dependencies
jest.mock('../../server/services/openai');
jest.mock('../../server/services/salesforce');
jest.mock('../../server/repositories/UserRepository');
jest.mock('../../server/repositories/MeetingRepository');
jest.mock('../../server/repositories/NoteRepository');

describe('API Integration Tests', () => {
  let app: express.Application;

  beforeAll(async () => {
    // Create a test Express app
    app = express();
    app.use(express.json());
    
    // Mock authentication middleware
    app.use((req, res, next) => {
      req.user = {
        id: 'test-user-id',
        email: 'test@example.com',
        claims: { sub: 'test-user-id' },
        expires_at: Math.floor(Date.now() / 1000) + 3600,
      };
      (req as any).isAuthenticated = () => true;
      next();
    });

    // Register routes
    await registerRoutes(app as any);
  });

  afterAll(async () => {
    // Cleanup
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('User API', () => {
    describe('GET /api/auth/user', () => {
      it('should return current user', async () => {
        const response = await request(app)
          .get('/api/auth/user')
          .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.id).toBe('test-user-id');
      });
    });
  });

  describe('Meetings API', () => {
    describe('POST /api/meetings', () => {
      it('should create a new meeting', async () => {
        const meetingData = {
          clientId: 1,
          clientName: 'Test Client',
          clientCompany: 'Test Company',
          dealType: 'enterprise',
          status: 'scheduled',
        };

        const response = await request(app)
          .post('/api/meetings')
          .send(meetingData)
          .expect(201);

        expect(response.body).toBeDefined();
        expect(response.body.clientName).toBe('Test Client');
        expect(response.body.userId).toBe('test-user-id');
      });

      it('should validate required fields', async () => {
        const invalidData = {
          clientName: 'Test Client',
          // Missing required fields
        };

        const response = await request(app)
          .post('/api/meetings')
          .send(invalidData)
          .expect(400);

        expect(response.body.message).toBeDefined();
      });
    });

    describe('GET /api/meetings', () => {
      it('should return user meetings', async () => {
        const response = await request(app)
          .get('/api/meetings')
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('GET /api/meetings/:id', () => {
      it('should return specific meeting', async () => {
        const response = await request(app)
          .get('/api/meetings/1')
          .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.id).toBe(1);
      });

      it('should return 404 for non-existent meeting', async () => {
        await request(app)
          .get('/api/meetings/999')
          .expect(404);
      });
    });

    describe('DELETE /api/meetings/:id', () => {
      it('should delete meeting', async () => {
        await request(app)
          .delete('/api/meetings/1')
          .expect(204);
      });

      it('should return 404 for non-existent meeting', async () => {
        await request(app)
          .delete('/api/meetings/999')
          .expect(404);
      });
    });
  });

  describe('Notes API', () => {
    describe('POST /api/notes', () => {
      it('should create a new note', async () => {
        const noteData = {
          meetingId: 1,
          content: 'Test note content',
        };

        const response = await request(app)
          .post('/api/notes')
          .send(noteData)
          .expect(201);

        expect(response.body).toBeDefined();
        expect(response.body.content).toBe('Test note content');
        expect(response.body.meetingId).toBe(1);
      });

      it('should validate required fields', async () => {
        const invalidData = {
          content: 'Test note content',
          // Missing meetingId
        };

        const response = await request(app)
          .post('/api/notes')
          .send(invalidData)
          .expect(400);

        expect(response.body.message).toBeDefined();
      });
    });

    describe('GET /api/notes', () => {
      it('should return notes for meeting', async () => {
        const response = await request(app)
          .get('/api/notes?meetingId=1')
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('PATCH /api/notes/:id', () => {
      it('should update note', async () => {
        const updateData = {
          content: 'Updated note content',
        };

        const response = await request(app)
          .patch('/api/notes/1')
          .send(updateData)
          .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.content).toBe('Updated note content');
      });
    });
  });

  describe('AI API', () => {
    describe('POST /api/ai/analyze', () => {
      it('should analyze notes', async () => {
        const analyzeData = {
          meetingId: 1,
        };

        const response = await request(app)
          .post('/api/ai/analyze')
          .send(analyzeData)
          .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.dealStage).toBeDefined();
        expect(response.body.painPoints).toBeDefined();
      });
    });

    describe('POST /api/ai/coaching', () => {
      it('should generate coaching suggestions', async () => {
        const coachingData = {
          meetingId: 1,
        };

        const response = await request(app)
          .post('/api/ai/coaching')
          .send(coachingData)
          .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.questions).toBeDefined();
        expect(response.body.painMapping).toBeDefined();
      });
    });

    describe('POST /api/ai/chat', () => {
      it('should handle chat messages', async () => {
        const chatData = {
          message: 'Test chat message',
          meetingContext: 'Test meeting context',
          conversationHistory: [],
        };

        const response = await request(app)
          .post('/api/ai/chat')
          .send(chatData)
          .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.response).toBeDefined();
      });
    });
  });

  describe('CRM API', () => {
    describe('GET /api/crm/status', () => {
      it('should return CRM status', async () => {
        const response = await request(app)
          .get('/api/crm/status')
          .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.connected).toBeDefined();
      });
    });

    describe('POST /api/crm/sync', () => {
      it('should sync meeting to CRM', async () => {
        const syncData = {
          meetingId: 1,
        };

        const response = await request(app)
          .post('/api/crm/sync')
          .send(syncData)
          .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.success).toBeDefined();
      });
    });
  });

  describe('Status API', () => {
    describe('GET /api/status', () => {
      it('should return system status', async () => {
        const response = await request(app)
          .get('/api/status')
          .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body.status).toBeDefined();
        expect(response.body.services).toBeDefined();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 for unknown routes', async () => {
      await request(app)
        .get('/api/unknown')
        .expect(404);
    });

    it('should handle malformed JSON', async () => {
      await request(app)
        .post('/api/meetings')
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(400);
    });

    it('should handle missing authentication', async () => {
      // Create app without auth middleware
      const appWithoutAuth = express();
      appWithoutAuth.use(express.json());
      await registerRoutes(appWithoutAuth);

      await request(appWithoutAuth)
        .get('/api/auth/user')
        .expect(401);
    });
  });
});
