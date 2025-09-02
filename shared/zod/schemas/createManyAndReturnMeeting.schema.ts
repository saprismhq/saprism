import { z } from 'zod';
import { MeetingSelectObjectSchema } from './objects/MeetingSelect.schema';
import { MeetingCreateManyInputObjectSchema } from './objects/MeetingCreateManyInput.schema';

export const MeetingCreateManyAndReturnSchema = z.object({ select: MeetingSelectObjectSchema.optional(), data: z.union([ MeetingCreateManyInputObjectSchema, z.array(MeetingCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()