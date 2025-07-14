// Legacy storage interface - kept for compatibility with auth system
// All functionality has been moved to separate repositories and services

import { type User, type UpsertUser } from "@shared/schema";
import { Container } from "./container/Container";
import { IUserService } from "./core/UserService";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  private userService: IUserService;

  constructor() {
    const container = Container.getInstance();
    this.userService = container.get<IUserService>('UserService');
  }

  // User operations - delegate to UserService
  async getUser(id: string): Promise<User | undefined> {
    return await this.userService.getUserById(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    return await this.userService.upsertUser(userData);
  }
}

export const storage = new DatabaseStorage();