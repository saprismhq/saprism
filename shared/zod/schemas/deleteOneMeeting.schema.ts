import { z } from 'zod';
import { MeetingWhereUniqueInputObjectSchema } from './objects/MeetingWhereUniqueInput.schema';

export const MeetingDeleteOneSchema = z.object({
  where: MeetingWhereUniqueInputObjectSchema,
});
