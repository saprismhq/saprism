import { UserRepository, IUserRepository } from "../repositories/UserRepository";
import { MeetingRepository, IMeetingRepository } from "../repositories/MeetingRepository";
import { NoteRepository, INoteRepository } from "../repositories/NoteRepository";
import { CoachingSuggestionRepository, ICoachingSuggestionRepository } from "../repositories/CoachingSuggestionRepository";
import { CrmSyncLogRepository, ICrmSyncLogRepository } from "../repositories/CrmSyncLogRepository";

import { UserService, IUserService } from "../core/UserService";
import { MeetingService, IMeetingService } from "../core/MeetingService";
import { NoteService, INoteService } from "../core/NoteService";
import { CoachingService, ICoachingService } from "../core/CoachingService";
import { CrmSyncService, ICrmSyncService } from "../core/CrmSyncService";
import { AuthenticationService, IAuthenticationService } from "../core/AuthenticationService";

export class Container {
  private static instance: Container;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.registerServices();
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private registerServices(): void {
    // Register repositories
    this.services.set('UserRepository', new UserRepository());
    this.services.set('MeetingRepository', new MeetingRepository());
    this.services.set('NoteRepository', new NoteRepository());
    this.services.set('CoachingSuggestionRepository', new CoachingSuggestionRepository());
    this.services.set('CrmSyncLogRepository', new CrmSyncLogRepository());

    // Register services
    this.services.set('UserService', new UserService(this.get<IUserRepository>('UserRepository')));
    this.services.set('MeetingService', new MeetingService(this.get<IMeetingRepository>('MeetingRepository')));
    this.services.set('NoteService', new NoteService(this.get<INoteRepository>('NoteRepository')));
    this.services.set('CoachingService', new CoachingService(this.get<ICoachingSuggestionRepository>('CoachingSuggestionRepository')));
    this.services.set('CrmSyncService', new CrmSyncService(this.get<ICrmSyncLogRepository>('CrmSyncLogRepository')));
    this.services.set('AuthenticationService', new AuthenticationService(this.get<IUserService>('UserService')));
  }

  get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }
    return service;
  }
}