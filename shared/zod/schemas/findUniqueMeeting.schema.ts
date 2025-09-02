import { z } from 'zod';
import { MeetingSelectObjectSchema } from './objects/MeetingSelect.schema';
import { MeetingIncludeObjectSchema } from './objects/MeetingInclude.schema';
import { MeetingWhereUniqueInputObjectSchema } from './objects/MeetingWhereUniqueInput.schema';

export const MeetingFindUniqueSchema = z.object({ select: MeetingSelectObjectSchema.optional(), include: MeetingIncludeObjectSchema.optional(), where: MeetingWhereUniqueInputObjectSchema })