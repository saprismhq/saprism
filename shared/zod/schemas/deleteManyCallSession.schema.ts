import { z } from 'zod';
import { CallSessionWhereInputObjectSchema } from './objects/CallSessionWhereInput.schema';

export const CallSessionDeleteManySchema = z.object({
  where: CallSessionWhereInputObjectSchema.optional(),
});
