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

// Define Client type since it might not be generated yet
export type Client = {
  id: number;
  userId: string;
  name: string; // Contact person name
  company: string; // Company name (now required)
  email: string | null;
  phone: string | null;
  industry: string | null;
  salesMethodology: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

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

export const ClientSchema = z.object({
  id: z.number(),
  userId: z.string(),
  name: z.string(), // Contact person name
  company: z.string(), // Company name (now required)
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  industry: z.string().nullable(),
  salesMethodology: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const InsertClientSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  name: z.string().min(1, "Contact name is required"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  industry: z.string().optional(),
  salesMethodology: z.string().optional(),
  notes: z.string().optional(),
  syncWithSalesforce: z.boolean().optional().default(false),
});

export type InsertClient = z.infer<typeof InsertClientSchema>;

// Sales Methodology Constants
export const SALES_METHODOLOGIES = [
  'SPIN Selling',
  'Challenger Sale',
  'MEDDIC',
  'Value Selling',
  'Solution Selling',
  'Consultative Selling',
  'NEAT Selling',
  'Sandler Selling',
  'Miller Heiman',
  'Custom Methodology'
] as const;

export type SalesMethodology = typeof SALES_METHODOLOGIES[number];

// Deal Type Constants
export const DEAL_TYPES = [
  'Connect',
  'Discovery',
  'Opportunity Stage',
  'Demo',
  'Influencer Buy-In',
  'Decision Maker Buy-In',
  'Negotiation',
  'Closing'
] as const;

export type DealType = typeof DEAL_TYPES[number];

export const MeetingSchema = z.object({
  id: z.number(),
  userId: z.string(),
  clientId: z.number().nullable(),
  clientName: z.string(),
  clientCompany: z.string().nullable(),
  dealType: z.string(),
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

// Create Meeting Schema for API requests
export const CreateMeetingSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  clientCompany: z.string().optional(),
  clientId: z.number().optional(),
  dealType: z.string().optional(),
});

export type CreateMeeting = z.infer<typeof CreateMeetingSchema>;

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