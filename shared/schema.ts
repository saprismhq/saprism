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

// Define CallSession type manually until Prisma client updates
export type CallSession = {
  id: string;
  meetingId: number;
  liveKitRoomName: string;
  liveKitToken?: string | null;
  participants: any;
  status: string;
  startedAt?: Date | null;
  endedAt?: Date | null;
  transcription?: any | null;
  sessionMetadata?: any | null;
  createdAt: Date;
  updatedAt: Date;
};

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

export const CallSessionSchema = z.object({
  id: z.string(),
  meetingId: z.number(),
  liveKitRoomName: z.string(),
  liveKitToken: z.string().nullable(),
  participants: z.any(),
  status: z.string(),
  startedAt: z.date().nullable(),
  endedAt: z.date().nullable(),
  transcription: z.any().nullable(),
  sessionMetadata: z.any().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
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
}).extend({
  clientCompany: z.string().optional().transform(val => val === "" ? null : val),
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

export const insertCallSessionSchema = CallSessionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Infer types from schemas
export type UpsertUser = z.infer<typeof insertUserSchema>;
export type InsertMeeting = z.infer<typeof insertMeetingSchema>;
export type InsertNote = z.infer<typeof insertNoteSchema>;
export type InsertCoachingSuggestion = z.infer<typeof insertCoachingSuggestionSchema>;
export type InsertCrmSyncLog = z.infer<typeof insertCrmSyncLogSchema>;
export type InsertCallSession = z.infer<typeof insertCallSessionSchema>;

// Extended types for queries with relations
import type { Meeting, Note, CoachingSuggestion } from '@prisma/client';

export type MeetingWithNotes = Meeting & {
  notes: Note[];
  coachingSuggestions: CoachingSuggestion[];
};

export type MeetingWithSessions = Meeting & {
  notes: Note[];
  coachingSuggestions: CoachingSuggestion[];
  callSessions?: CallSession[];
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

// Enhanced pain-to-value mapping with business impact framework
export type PainValueMapping = {
  pain: string;
  category: 'operational' | 'financial' | 'strategic' | 'compliance' | 'competitive';
  severity: 1 | 2 | 3 | 4 | 5; // 1 = minor, 5 = critical
  businessImpact: {
    cost: string; // Quantified cost of the pain
    productivity: string; // Productivity impact
    risk: string; // Risk or opportunity cost
  };
  technicalSolution: string;
  businessValue: {
    immediate: string; // Short-term benefits (0-3 months)
    mediumTerm: string; // Medium-term benefits (3-12 months)
    longTerm: string; // Long-term strategic value (12+ months)
  };
  metrics: {
    kpi: string; // Key performance indicator affected
    baseline: string; // Current state measurement
    target: string; // Expected improvement
    timeframe: string; // Timeline to achieve target
  };
  stakeholderBenefit: {
    executives: string; // C-level impact
    managers: string; // Management impact
    endUsers: string; // End user impact
  };
  competitiveAdvantage: string;
};

// Coaching suggestion content type
export type CoachingSuggestionContent = {
  questions?: string[];
  painMapping?: PainValueMapping[];
  framing?: {
    context: string;
    suggestion: string;
    valueProposition: string;
    differentiators: string[];
  };
  nextSteps?: Array<{
    step: string;
    priority: number;
    description: string;
    businessJustification: string;
    expectedOutcome: string;
  }>;
};