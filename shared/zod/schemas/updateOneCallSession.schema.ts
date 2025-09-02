import { z } from 'zod';
import { CallSessionSelectObjectSchema } from './objects/CallSessionSelect.schema';
import { CallSessionIncludeObjectSchema } from './objects/CallSessionInclude.schema';
import { CallSessionUpdateInputObjectSchema } from './objects/CallSessionUpdateInput.schema';
import { CallSessionUncheckedUpdateInputObjectSchema } from './objects/CallSessionUncheckedUpdateInput.schema';
import { CallSessionWhereUniqueInputObjectSchema } from './objects/CallSessionWhereUniqueInput.schema';

export const CallSessionUpdateOneSchema = z.object({ select: CallSessionSelectObjectSchema.optional(), include: CallSessionIncludeObjectSchema.optional(), data: z.union([CallSessionUpdateInputObjectSchema, CallSessionUncheckedUpdateInputObjectSchema]), where: CallSessionWhereUniqueInputObjectSchema  })