import { z } from 'zod';
import { CallSessionCreateInputObjectSchema } from './objects/CallSessionCreateInput.schema';
import { CallSessionUncheckedCreateInputObjectSchema } from './objects/CallSessionUncheckedCreateInput.schema';

export const CallSessionCreateOneSchema = z.object({
  data: z.union([
    CallSessionCreateInputObjectSchema,
    CallSessionUncheckedCreateInputObjectSchema,
  ]),
});
