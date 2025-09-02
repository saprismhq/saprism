import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './MeetingUncheckedCreateNestedManyWithoutUserInput.schema';
import { ClientUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ClientUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().max(255),
  email: z.string().max(255).nullish(),
  firstName: z.string().max(255).nullish(),
  lastName: z.string().max(255).nullish(),
  profileImageUrl: z.string().max(255).nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  meetings: z.lazy(() => MeetingUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  clients: z.lazy(() => ClientUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>;
export const UserUncheckedCreateInputObjectZodSchema = makeSchema();
