import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema';
import { MeetingFindManySchema } from '../findManyMeeting.schema';
import { ClientCountOutputTypeArgsObjectSchema } from './ClientCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  meetings: z.union([z.boolean(), z.lazy(() => MeetingFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ClientCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ClientIncludeObjectSchema: z.ZodType<Prisma.ClientInclude> = makeSchema() as unknown as z.ZodType<Prisma.ClientInclude>;
export const ClientIncludeObjectZodSchema = makeSchema();
