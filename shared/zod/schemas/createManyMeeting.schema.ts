import { z } from 'zod';
import { MeetingCreateManyInputObjectSchema } from './objects/MeetingCreateManyInput.schema';

export const MeetingCreateManySchema = z.object({
  data: z.union([
    MeetingCreateManyInputObjectSchema,
    z.array(MeetingCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
