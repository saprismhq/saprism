import { z } from 'zod';
import { CallSessionWhereUniqueInputObjectSchema } from './objects/CallSessionWhereUniqueInput.schema';

export const CallSessionDeleteOneSchema = z.object({
  where: CallSessionWhereUniqueInputObjectSchema,
});
