import { z } from 'zod';
import { NoteUpdateInputObjectSchema } from './objects/NoteUpdateInput.schema';
import { NoteUncheckedUpdateInputObjectSchema } from './objects/NoteUncheckedUpdateInput.schema';
import { NoteWhereUniqueInputObjectSchema } from './objects/NoteWhereUniqueInput.schema';

export const NoteUpdateOneSchema = z.object({
  data: z.union([
    NoteUpdateInputObjectSchema,
    NoteUncheckedUpdateInputObjectSchema,
  ]),
  where: NoteWhereUniqueInputObjectSchema,
});
