import { z } from 'zod';
import { MeetingUpdateManyMutationInputObjectSchema } from './objects/MeetingUpdateManyMutationInput.schema';
import { MeetingWhereInputObjectSchema } from './objects/MeetingWhereInput.schema';

export const MeetingUpdateManySchema = z.object({ data: MeetingUpdateManyMutationInputObjectSchema, where: MeetingWhereInputObjectSchema.optional()  })