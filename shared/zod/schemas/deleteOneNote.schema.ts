import { z } from 'zod';
import { NoteWhereUniqueInputObjectSchema } from './objects/NoteWhereUniqueInput.schema';

export const NoteDeleteOneSchema = z.object({
  where: NoteWhereUniqueInputObjectSchema,
});
