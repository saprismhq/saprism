import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingFindManySchema } from '../findManyMeeting.schema';
import { ClientFindManySchema } from '../findManyClient.schema';
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  meetings: z.union([z.boolean(), z.lazy(() => MeetingFindManySchema)]).optional(),
  clients: z.union([z.boolean(), z.lazy(() => ClientFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> = makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
