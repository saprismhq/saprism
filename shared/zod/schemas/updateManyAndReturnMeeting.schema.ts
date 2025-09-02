import { z } from 'zod';
import { MeetingSelectObjectSchema } from './objects/MeetingSelect.schema';
import { MeetingUpdateManyMutationInputObjectSchema } from './objects/MeetingUpdateManyMutationInput.schema';
import { MeetingWhereInputObjectSchema } from './objects/MeetingWhereInput.schema';

export const MeetingUpdateManyAndReturnSchema = z.object({ select: MeetingSelectObjectSchema.optional(), data: MeetingUpdateManyMutationInputObjectSchema, where: MeetingWhereInputObjectSchema.optional()  }).strict()