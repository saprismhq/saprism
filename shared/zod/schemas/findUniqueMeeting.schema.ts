import { z } from 'zod';
import { MeetingWhereUniqueInputObjectSchema } from './objects/MeetingWhereUniqueInput.schema';

export const MeetingFindUniqueSchema = z.object({
  where: MeetingWhereUniqueInputObjectSchema,
});
