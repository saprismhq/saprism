import { users, type User, type UpsertUser } from "@shared/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export interface IUserRepository {
  getById(id: string): Promise<User | undefined>;
  upsert(userData: UpsertUser): Promise<User>;
}

export class UserRepository implements IUserRepository {
  async getById(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsert(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }
}