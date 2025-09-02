import { z } from 'zod';
import { MeetingSelectObjectSchema } from './objects/MeetingSelect.schema';
import { MeetingIncludeObjectSchema } from './objects/MeetingInclude.schema';
import { MeetingCreateInputObjectSchema } from './objects/MeetingCreateInput.schema';
import { MeetingUncheckedCreateInputObjectSchema } from './objects/MeetingUncheckedCreateInput.schema';

export const MeetingCreateOneSchema = z.object({ select: MeetingSelectObjectSchema.optional(), include: MeetingIncludeObjectSchema.optional(), data: z.union([MeetingCreateInputObjectSchema, MeetingUncheckedCreateInputObjectSchema])  })