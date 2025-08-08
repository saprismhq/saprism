import { z } from 'zod';
import { CallSessionWhereUniqueInputObjectSchema } from './objects/CallSessionWhereUniqueInput.schema';
import { CallSessionCreateInputObjectSchema } from './objects/CallSessionCreateInput.schema';
import { CallSessionUncheckedCreateInputObjectSchema } from './objects/CallSessionUncheckedCreateInput.schema';
import { CallSessionUpdateInputObjectSchema } from './objects/CallSessionUpdateInput.schema';
import { CallSessionUncheckedUpdateInputObjectSchema } from './objects/CallSessionUncheckedUpdateInput.schema';

export const CallSessionUpsertSchema = z.object({
  where: CallSessionWhereUniqueInputObjectSchema,
  create: z.union([
    CallSessionCreateInputObjectSchema,
    CallSessionUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    CallSessionUpdateInputObjectSchema,
    CallSessionUncheckedUpdateInputObjectSchema,
  ]),
});
