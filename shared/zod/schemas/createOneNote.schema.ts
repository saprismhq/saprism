import { z } from 'zod';
import { NoteCreateInputObjectSchema } from './objects/NoteCreateInput.schema';
import { NoteUncheckedCreateInputObjectSchema } from './objects/NoteUncheckedCreateInput.schema';

export const NoteCreateOneSchema = z.object({
  data: z.union([
    NoteCreateInputObjectSchema,
    NoteUncheckedCreateInputObjectSchema,
  ]),
});
