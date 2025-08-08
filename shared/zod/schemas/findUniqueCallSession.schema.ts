import { z } from 'zod';
import { CallSessionWhereUniqueInputObjectSchema } from './objects/CallSessionWhereUniqueInput.schema';

export const CallSessionFindUniqueSchema = z.object({
  where: CallSessionWhereUniqueInputObjectSchema,
});
