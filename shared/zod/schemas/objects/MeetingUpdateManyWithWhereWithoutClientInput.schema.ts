import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingScalarWhereInputObjectSchema } from './MeetingScalarWhereInput.schema';
import { MeetingUpdateManyMutationInputObjectSchema } from './MeetingUpdateManyMutationInput.schema';
import { MeetingUncheckedUpdateManyWithoutClientInputObjectSchema } from './MeetingUncheckedUpdateManyWithoutClientInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => MeetingScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => MeetingUpdateManyMutationInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateManyWithoutClientInputObjectSchema)])
}).strict();
export const MeetingUpdateManyWithWhereWithoutClientInputObjectSchema: z.ZodType<Prisma.MeetingUpdateManyWithWhereWithoutClientInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpdateManyWithWhereWithoutClientInput>;
export const MeetingUpdateManyWithWhereWithoutClientInputObjectZodSchema = makeSchema();
