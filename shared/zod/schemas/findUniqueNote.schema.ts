import { z } from 'zod';
import { NoteWhereUniqueInputObjectSchema } from './objects/NoteWhereUniqueInput.schema';

export const NoteFindUniqueSchema = z.object({
  where: NoteWhereUniqueInputObjectSchema,
});
