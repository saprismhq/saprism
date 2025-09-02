import { z } from 'zod';
import { MeetingSelectObjectSchema } from './objects/MeetingSelect.schema';
import { MeetingIncludeObjectSchema } from './objects/MeetingInclude.schema';
import { MeetingWhereUniqueInputObjectSchema } from './objects/MeetingWhereUniqueInput.schema';
import { MeetingCreateInputObjectSchema } from './objects/MeetingCreateInput.schema';
import { MeetingUncheckedCreateInputObjectSchema } from './objects/MeetingUncheckedCreateInput.schema';
import { MeetingUpdateInputObjectSchema } from './objects/MeetingUpdateInput.schema';
import { MeetingUncheckedUpdateInputObjectSchema } from './objects/MeetingUncheckedUpdateInput.schema';

export const MeetingUpsertSchema = z.object({ select: MeetingSelectObjectSchema.optional(), include: MeetingIncludeObjectSchema.optional(), where: MeetingWhereUniqueInputObjectSchema, create: z.union([ MeetingCreateInputObjectSchema, MeetingUncheckedCreateInputObjectSchema ]), update: z.union([ MeetingUpdateInputObjectSchema, MeetingUncheckedUpdateInputObjectSchema ])  })