import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingFindManySchema } from '../findManyMeeting.schema';
import { ClientFindManySchema } from '../findManyClient.schema';
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  profileImageUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  meetings: z.union([z.boolean(), z.lazy(() => MeetingFindManySchema)]).optional(),
  clients: z.union([z.boolean(), z.lazy(() => ClientFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = makeSchema();
