import { crmSyncLogs, type CrmSyncLog, type InsertCrmSyncLog } from "@shared/schema";
import { db } from "../db";
import { eq, desc } from "drizzle-orm";

export interface ICrmSyncLogRepository {
  create(log: InsertCrmSyncLog): Promise<CrmSyncLog>;
  getByMeetingId(meetingId: number): Promise<CrmSyncLog[]>;
}

export class CrmSyncLogRepository implements ICrmSyncLogRepository {
  async create(log: InsertCrmSyncLog): Promise<CrmSyncLog> {
    const [newLog] = await db
      .insert(crmSyncLogs)
      .values(log)
      .returning();
    return newLog;
  }

  async getByMeetingId(meetingId: number): Promise<CrmSyncLog[]> {
    return await db
      .select()
      .from(crmSyncLogs)
      .where(eq(crmSyncLogs.meetingId, meetingId))
      .orderBy(desc(crmSyncLogs.createdAt));
  }
}