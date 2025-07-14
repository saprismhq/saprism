import { z } from 'zod';

// Re-export Prisma types
export type {
  User,
  Meeting,
  Note,
  CoachingSuggestion,
  CrmSyncLog,
  Session,
} from '@prisma/client';

// Create validation schemas manually for better control
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  profileImageUrl: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MeetingSchema = z.object({
  id: z.number(),
  userId: z.string(),
  clientName: z.string(),
  clientCompany: z.string().nullable(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const NoteSchema = z.object({
  id: z.number(),
  meetingId: z.number(),
  content: z.string(),
  aiAnalysis: z.any().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CoachingSuggestionSchema = z.object({
  id: z.number(),
  meetingId: z.number(),
  type: z.string(),
  content: z.any(),
  isUsed: z.boolean().nullable(),
  createdAt: z.date().nullable(),
});

export const CrmSyncLogSchema = z.object({
  id: z.number(),
  meetingId: z.number(),
  status: z.string(),
  syncData: z.any().nullable(),
  error: z.string().nullable(),
  createdAt: z.date(),
});

export const SessionSchema = z.object({
  sid: z.string(),
  sess: z.any(),
  expire: z.date(),
});

// Create insert schemas by omitting auto-generated fields
export const insertUserSchema = UserSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const insertMeetingSchema = MeetingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNoteSchema = NoteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCoachingSuggestionSchema = CoachingSuggestionSchema.omit({
  id: true,
  createdAt: true,
}).partial({
  isUsed: true,
});

export const insertCrmSyncLogSchema = CrmSyncLogSchema.omit({
  id: true,
  createdAt: true,
});

// Infer types from schemas
export type UpsertUser = z.infer<typeof insertUserSchema>;
export type InsertMeeting = z.infer<typeof insertMeetingSchema>;
export type InsertNote = z.infer<typeof insertNoteSchema>;
export type InsertCoachingSuggestion = z.infer<typeof insertCoachingSuggestionSchema>;
export type InsertCrmSyncLog = z.infer<typeof insertCrmSyncLogSchema>;

// Extended types for queries with relations
import type { Meeting, Note, CoachingSuggestion } from '@prisma/client';

export type MeetingWithNotes = Meeting & {
  notes: Note[];
  coachingSuggestions: CoachingSuggestion[];
};

// AI Analysis types
export type AIAnalysisResult = {
  dealStage: string;
  painPoints: string[];
  budget: string;
  timeline: string;
  keyStakeholders: string[];
  sentiment: number;
  confidence: number;
};

// Coaching suggestion content type
export type CoachingSuggestionContent = {
  questions?: string[];
  painMapping?: Array<{
    pain: string;
    value: string;
  }>;
  framing?: {
    context: string;
    suggestion: string;
  };
  nextSteps?: Array<{
    step: string;
    priority: number;
    description: string;
  }>;
};