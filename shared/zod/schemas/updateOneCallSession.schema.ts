import { z } from 'zod';
import { CallSessionUpdateInputObjectSchema } from './objects/CallSessionUpdateInput.schema';
import { CallSessionUncheckedUpdateInputObjectSchema } from './objects/CallSessionUncheckedUpdateInput.schema';
import { CallSessionWhereUniqueInputObjectSchema } from './objects/CallSessionWhereUniqueInput.schema';

export const CallSessionUpdateOneSchema = z.object({
  data: z.union([
    CallSessionUpdateInputObjectSchema,
    CallSessionUncheckedUpdateInputObjectSchema,
  ]),
  where: CallSessionWhereUniqueInputObjectSchema,
});
