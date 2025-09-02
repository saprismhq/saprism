import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MeetingCreateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingCreateWithoutCoachingSuggestionsInput.schema';
import { MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUncheckedCreateWithoutCoachingSuggestionsInput.schema';
import { MeetingCreateOrConnectWithoutCoachingSuggestionsInputObjectSchema } from './MeetingCreateOrConnectWithoutCoachingSuggestionsInput.schema';
import { MeetingUpsertWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUpsertWithoutCoachingSuggestionsInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './MeetingWhereUniqueInput.schema';
import { MeetingUpdateToOneWithWhereWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUpdateToOneWithWhereWithoutCoachingSuggestionsInput.schema';
import { MeetingUpdateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUpdateWithoutCoachingSuggestionsInput.schema';
import { MeetingUncheckedUpdateWithoutCoachingSuggestionsInputObjectSchema } from './MeetingUncheckedUpdateWithoutCoachingSuggestionsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  create: z.union([z.lazy(() => MeetingCreateWithoutCoachingSuggestionsInputObjectSchema), z.lazy(() => MeetingUncheckedCreateWithoutCoachingSuggestionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => MeetingCreateOrConnectWithoutCoachingSuggestionsInputObjectSchema).optional(),
  upsert: z.lazy(() => MeetingUpsertWithoutCoachingSuggestionsInputObjectSchema).optional(),
  connect: z.lazy(() => MeetingWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => MeetingUpdateToOneWithWhereWithoutCoachingSuggestionsInputObjectSchema), z.lazy(() => MeetingUpdateWithoutCoachingSuggestionsInputObjectSchema), z.lazy(() => MeetingUncheckedUpdateWithoutCoachingSuggestionsInputObjectSchema)]).optional()
}).strict();
export const MeetingUpdateOneRequiredWithoutCoachingSuggestionsNestedInputObjectSchema: z.ZodType<Prisma.MeetingUpdateOneRequiredWithoutCoachingSuggestionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MeetingUpdateOneRequiredWithoutCoachingSuggestionsNestedInput>;
export const MeetingUpdateOneRequiredWithoutCoachingSuggestionsNestedInputObjectZodSchema = makeSchema();
