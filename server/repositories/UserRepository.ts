import { type User, type UpsertUser } from "@shared/schema";
import { db } from "../db";

export interface IUserRepository {
  getById(id: string): Promise<User | undefined>;
  upsert(userData: UpsertUser): Promise<User>;
}

export class UserRepository implements IUserRepository {
  async getById(id: string): Promise<User | undefined> {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user || undefined;
  }

  async upsert(userData: UpsertUser): Promise<User> {
    const user = await db.user.upsert({
      where: { id: userData.id },
      update: {
        ...userData,
        updatedAt: new Date(),
      },
      create: userData,
    });
    return user;
  }
}