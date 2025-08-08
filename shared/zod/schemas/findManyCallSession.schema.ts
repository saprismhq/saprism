import { z } from 'zod';
import { CallSessionOrderByWithRelationInputObjectSchema } from './objects/CallSessionOrderByWithRelationInput.schema';
import { CallSessionWhereInputObjectSchema } from './objects/CallSessionWhereInput.schema';
import { CallSessionWhereUniqueInputObjectSchema } from './objects/CallSessionWhereUniqueInput.schema';
import { CallSessionScalarFieldEnumSchema } from './enums/CallSessionScalarFieldEnum.schema';

export const CallSessionFindManySchema = z.object({
  orderBy: z
    .union([
      CallSessionOrderByWithRelationInputObjectSchema,
      CallSessionOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: CallSessionWhereInputObjectSchema.optional(),
  cursor: CallSessionWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(CallSessionScalarFieldEnumSchema).optional(),
});
