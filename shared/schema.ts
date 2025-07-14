import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Meetings table
export const meetings = pgTable("meetings", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  clientName: varchar("client_name").notNull(),
  clientCompany: varchar("client_company"),
  meetingDate: timestamp("meeting_date").defaultNow(),
  status: varchar("status").default("active"), // active, completed, archived
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Notes table
export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  meetingId: integer("meeting_id").references(() => meetings.id).notNull(),
  content: text("content").notNull(),
  aiAnalysis: jsonb("ai_analysis"), // stores AI analysis results
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// AI Coaching suggestions table
export const coachingSuggestions = pgTable("coaching_suggestions", {
  id: serial("id").primaryKey(),
  meetingId: integer("meeting_id").references(() => meetings.id).notNull(),
  type: varchar("type").notNull(), // questions, pain_mapping, framing, next_steps
  content: jsonb("content").notNull(),
  isUsed: boolean("is_used").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// CRM sync logs table
export const crmSyncLogs = pgTable("crm_sync_logs", {
  id: serial("id").primaryKey(),
  meetingId: integer("meeting_id").references(() => meetings.id).notNull(),
  status: varchar("status").notNull(), // success, failed, pending
  syncData: jsonb("sync_data"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  meetings: many(meetings),
}));

export const meetingsRelations = relations(meetings, ({ one, many }) => ({
  user: one(users, {
    fields: [meetings.userId],
    references: [users.id],
  }),
  notes: many(notes),
  coachingSuggestions: many(coachingSuggestions),
  crmSyncLogs: many(crmSyncLogs),
}));

export const notesRelations = relations(notes, ({ one }) => ({
  meeting: one(meetings, {
    fields: [notes.meetingId],
    references: [meetings.id],
  }),
}));

export const coachingSuggestionsRelations = relations(coachingSuggestions, ({ one }) => ({
  meeting: one(meetings, {
    fields: [coachingSuggestions.meetingId],
    references: [meetings.id],
  }),
}));

export const crmSyncLogsRelations = relations(crmSyncLogs, ({ one }) => ({
  meeting: one(meetings, {
    fields: [crmSyncLogs.meetingId],
    references: [meetings.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users);
export const insertMeetingSchema = createInsertSchema(meetings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertNoteSchema = createInsertSchema(notes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertCoachingSuggestionSchema = createInsertSchema(coachingSuggestions).omit({
  id: true,
  createdAt: true,
});
export const insertCrmSyncLogSchema = createInsertSchema(crmSyncLogs).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertMeeting = z.infer<typeof insertMeetingSchema>;
export type Meeting = typeof meetings.$inferSelect;
export type InsertNote = z.infer<typeof insertNoteSchema>;
export type Note = typeof notes.$inferSelect;
export type InsertCoachingSuggestion = z.infer<typeof insertCoachingSuggestionSchema>;
export type CoachingSuggestion = typeof coachingSuggestions.$inferSelect;
export type InsertCrmSyncLog = z.infer<typeof insertCrmSyncLogSchema>;
export type CrmSyncLog = typeof crmSyncLogs.$inferSelect;

// Extended types for API responses
export type MeetingWithNotes = Meeting & {
  notes: Note[];
  coachingSuggestions: CoachingSuggestion[];
};

export type AIAnalysisResult = {
  dealStage: string;
  painPoints: string[];
  budget: string;
  timeline: string;
  keyStakeholders: string[];
  sentiment: number;
  confidence: number;
};

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
