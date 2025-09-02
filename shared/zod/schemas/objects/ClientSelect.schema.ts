import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema';
import { MeetingFindManySchema } from '../findManyMeeting.schema';
import { ClientCountOutputTypeArgsObjectSchema } from './ClientCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  company: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  industry: z.boolean().optional(),
  salesMethodology: z.boolean().optional(),
  notes: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  meetings: z.union([z.boolean(), z.lazy(() => MeetingFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ClientCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ClientSelectObjectSchema: z.ZodType<Prisma.ClientSelect> = makeSchema() as unknown as z.ZodType<Prisma.ClientSelect>;
export const ClientSelectObjectZodSchema = makeSchema();
