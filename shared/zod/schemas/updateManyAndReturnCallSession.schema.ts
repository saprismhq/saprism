import { z } from 'zod';
import { CallSessionSelectObjectSchema } from './objects/CallSessionSelect.schema';
import { CallSessionUpdateManyMutationInputObjectSchema } from './objects/CallSessionUpdateManyMutationInput.schema';
import { CallSessionWhereInputObjectSchema } from './objects/CallSessionWhereInput.schema';

export const CallSessionUpdateManyAndReturnSchema = z.object({ select: CallSessionSelectObjectSchema.optional(), data: CallSessionUpdateManyMutationInputObjectSchema, where: CallSessionWhereInputObjectSchema.optional()  }).strict()