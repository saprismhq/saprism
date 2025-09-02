import { z } from 'zod';
import { NoteSelectObjectSchema } from './objects/NoteSelect.schema';
import { NoteIncludeObjectSchema } from './objects/NoteInclude.schema';
import { NoteUpdateInputObjectSchema } from './objects/NoteUpdateInput.schema';
import { NoteUncheckedUpdateInputObjectSchema } from './objects/NoteUncheckedUpdateInput.schema';
import { NoteWhereUniqueInputObjectSchema } from './objects/NoteWhereUniqueInput.schema';

export const NoteUpdateOneSchema = z.object({ select: NoteSelectObjectSchema.optional(), include: NoteIncludeObjectSchema.optional(), data: z.union([NoteUpdateInputObjectSchema, NoteUncheckedUpdateInputObjectSchema]), where: NoteWhereUniqueInputObjectSchema  })