import { type CrmSyncLog, type InsertCrmSyncLog } from "@shared/schema";
import { db } from "../db";

export interface ICrmSyncLogRepository {
  create(log: InsertCrmSyncLog): Promise<CrmSyncLog>;
  getByMeetingId(meetingId: number): Promise<CrmSyncLog[]>;
}

export class CrmSyncLogRepository implements ICrmSyncLogRepository {
  async create(log: InsertCrmSyncLog): Promise<CrmSyncLog> {
    const newLog = await db.crmSyncLog.create({
      data: log,
    });
    return newLog;
  }

  async getByMeetingId(meetingId: number): Promise<CrmSyncLog[]> {
    return await db.crmSyncLog.findMany({
      where: { meetingId },
      orderBy: { createdAt: 'desc' },
    });
  }
}