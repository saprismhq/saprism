import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().max(255),
  email: z.string().max(255).nullish(),
  firstName: z.string().max(255).nullish(),
  lastName: z.string().max(255).nullish(),
  profileImageUrl: z.string().max(255).nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const UserCreateManyInputObjectSchema: z.ZodType<Prisma.UserCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateManyInput>;
export const UserCreateManyInputObjectZodSchema = makeSchema();
