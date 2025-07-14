import { z } from 'zod';
import { MeetingOrderByWithRelationInputObjectSchema } from './objects/MeetingOrderByWithRelationInput.schema';
import { MeetingWhereInputObjectSchema } from './objects/MeetingWhereInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './objects/MeetingWhereUniqueInput.schema';
import { MeetingScalarFieldEnumSchema } from './enums/MeetingScalarFieldEnum.schema';

export const MeetingFindManySchema = z.object({
  orderBy: z
    .union([
      MeetingOrderByWithRelationInputObjectSchema,
      MeetingOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: MeetingWhereInputObjectSchema.optional(),
  cursor: MeetingWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(MeetingScalarFieldEnumSchema).optional(),
});
