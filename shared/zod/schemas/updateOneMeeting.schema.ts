import { z } from 'zod';
import { MeetingSelectObjectSchema } from './objects/MeetingSelect.schema';
import { MeetingIncludeObjectSchema } from './objects/MeetingInclude.schema';
import { MeetingUpdateInputObjectSchema } from './objects/MeetingUpdateInput.schema';
import { MeetingUncheckedUpdateInputObjectSchema } from './objects/MeetingUncheckedUpdateInput.schema';
import { MeetingWhereUniqueInputObjectSchema } from './objects/MeetingWhereUniqueInput.schema';

export const MeetingUpdateOneSchema = z.object({ select: MeetingSelectObjectSchema.optional(), include: MeetingIncludeObjectSchema.optional(), data: z.union([MeetingUpdateInputObjectSchema, MeetingUncheckedUpdateInputObjectSchema]), where: MeetingWhereUniqueInputObjectSchema  })