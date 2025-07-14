import { z } from 'zod';
import { MeetingCreateInputObjectSchema } from './objects/MeetingCreateInput.schema';
import { MeetingUncheckedCreateInputObjectSchema } from './objects/MeetingUncheckedCreateInput.schema';

export const MeetingCreateOneSchema = z.object({
  data: z.union([
    MeetingCreateInputObjectSchema,
    MeetingUncheckedCreateInputObjectSchema,
  ]),
});
