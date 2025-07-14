import { z } from 'zod';
import { MeetingWhereUniqueInputObjectSchema } from './objects/MeetingWhereUniqueInput.schema';
import { MeetingCreateInputObjectSchema } from './objects/MeetingCreateInput.schema';
import { MeetingUncheckedCreateInputObjectSchema } from './objects/MeetingUncheckedCreateInput.schema';
import { MeetingUpdateInputObjectSchema } from './objects/MeetingUpdateInput.schema';
import { MeetingUncheckedUpdateInputObjectSchema } from './objects/MeetingUncheckedUpdateInput.schema';

export const MeetingUpsertSchema = z.object({
  where: MeetingWhereUniqueInputObjectSchema,
  create: z.union([
    MeetingCreateInputObjectSchema,
    MeetingUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    MeetingUpdateInputObjectSchema,
    MeetingUncheckedUpdateInputObjectSchema,
  ]),
});
