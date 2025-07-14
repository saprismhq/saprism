import { type CrmSyncLog, type InsertCrmSyncLog } from "@shared/schema";
import { ICrmSyncLogRepository } from "../repositories/CrmSyncLogRepository";

export interface ICrmSyncService {
  createCrmSyncLog(log: InsertCrmSyncLog): Promise<CrmSyncLog>;
  getCrmSyncLogsByMeetingId(meetingId: number): Promise<CrmSyncLog[]>;
}

export class CrmSyncService implements ICrmSyncService {
  constructor(private crmSyncLogRepository: ICrmSyncLogRepository) {}

  async createCrmSyncLog(log: InsertCrmSyncLog): Promise<CrmSyncLog> {
    return await this.crmSyncLogRepository.create(log);
  }

  async getCrmSyncLogsByMeetingId(meetingId: number): Promise<CrmSyncLog[]> {
    return await this.crmSyncLogRepository.getByMeetingId(meetingId);
  }
}