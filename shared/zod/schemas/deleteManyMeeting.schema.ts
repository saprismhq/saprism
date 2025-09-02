import { z } from 'zod';
import { MeetingWhereInputObjectSchema } from './objects/MeetingWhereInput.schema';

export const MeetingDeleteManySchema = z.object({ where: MeetingWhereInputObjectSchema.optional()  })