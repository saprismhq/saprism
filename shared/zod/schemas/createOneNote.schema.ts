import { z } from 'zod';
import { NoteSelectObjectSchema } from './objects/NoteSelect.schema';
import { NoteIncludeObjectSchema } from './objects/NoteInclude.schema';
import { NoteCreateInputObjectSchema } from './objects/NoteCreateInput.schema';
import { NoteUncheckedCreateInputObjectSchema } from './objects/NoteUncheckedCreateInput.schema';

export const NoteCreateOneSchema = z.object({ select: NoteSelectObjectSchema.optional(), include: NoteIncludeObjectSchema.optional(), data: z.union([NoteCreateInputObjectSchema, NoteUncheckedCreateInputObjectSchema])  })