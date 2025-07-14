import { z } from 'zod';
import { MeetingUpdateInputObjectSchema } from './objects/MeetingUpdateInput.schema';
import { MeetingUncheckedUpdateInputObjectSchema } from './objects/MeetingUncheckedUpdateInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './objects/MeetingWhereUniqueInput.schema';

export const MeetingUpdateOneSchema = z.object({
  data: z.union([
    MeetingUpdateInputObjectSchema,
    MeetingUncheckedUpdateInputObjectSchema,
  ]),
  where: MeetingWhereUniqueInputObjectSchema,
});
