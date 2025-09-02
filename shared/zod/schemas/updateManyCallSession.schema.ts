import { z } from 'zod';
import { CallSessionUpdateManyMutationInputObjectSchema } from './objects/CallSessionUpdateManyMutationInput.schema';
import { CallSessionWhereInputObjectSchema } from './objects/CallSessionWhereInput.schema';

export const CallSessionUpdateManySchema = z.object({ data: CallSessionUpdateManyMutationInputObjectSchema, where: CallSessionWhereInputObjectSchema.optional()  })