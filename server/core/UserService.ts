import { type User, type UpsertUser } from "@shared/schema";
import { IUserRepository } from "../repositories/UserRepository";

export interface IUserService {
  getUserById(id: string): Promise<User | undefined>;
  upsertUser(userData: UpsertUser): Promise<User>;
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getUserById(id: string): Promise<User | undefined> {
    return await this.userRepository.getById(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    return await this.userRepository.upsert(userData);
  }
}