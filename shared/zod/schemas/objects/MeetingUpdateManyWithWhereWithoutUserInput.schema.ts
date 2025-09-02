import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingScalarWhereInputObjectSchema } from './MeetingScalarWhereInput.schema';
import { MeetingUpdateManyMutationInputObjectSchema } from './MeetingUpdateManyMutationInput.schema';
import { MeetingUncheckedUpdateManyWithoutUserInputObjectSchema } from './MeetingUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => MeetingUpdateManyMutationInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const MeetingUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.MeetingUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpdateManyWithWhereWithoutUserInput>;
export const MeetingUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
