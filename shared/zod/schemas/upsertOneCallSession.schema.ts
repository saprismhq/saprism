import { z } from 'zod';
import { CallSessionSelectObjectSchema } from './objects/CallSessionSelect.schema';
import { CallSessionIncludeObjectSchema } from './objects/CallSessionInclude.schema';
import { CallSessionWhereUniqueInputObjectSchema } from './objects/CallSessionWhereUniqueInput.schema';
import { CallSessionCreateInputObjectSchema } from './objects/CallSessionCreateInput.schema';
import { CallSessionUncheckedCreateInputObjectSchema } from './objects/CallSessionUncheckedCreateInput.schema';
import { CallSessionUpdateInputObjectSchema } from './objects/CallSessionUpdateInput.schema';
import { CallSessionUncheckedUpdateInputObjectSchema } from './objects/CallSessionUncheckedUpdateInput.schema';

export const CallSessionUpsertSchema = z.object({ select: CallSessionSelectObjectSchema.optional(), include: CallSessionIncludeObjectSchema.optional(), where: CallSessionWhereUniqueInputObjectSchema, create: z.union([ CallSessionCreateInputObjectSchema, CallSessionUncheckedCreateInputObjectSchema ]), update: z.union([ CallSessionUpdateInputObjectSchema, CallSessionUncheckedUpdateInputObjectSchema ])  })