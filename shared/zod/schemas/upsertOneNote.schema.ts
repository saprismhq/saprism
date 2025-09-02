import { z } from 'zod';
import { NoteSelectObjectSchema } from './objects/NoteSelect.schema';
import { NoteIncludeObjectSchema } from './objects/NoteInclude.schema';
import { NoteWhereUniqueInputObjectSchema } from './objects/NoteWhereUniqueInput.schema';
import { NoteCreateInputObjectSchema } from './objects/NoteCreateInput.schema';
import { NoteUncheckedCreateInputObjectSchema } from './objects/NoteUncheckedCreateInput.schema';
import { NoteUpdateInputObjectSchema } from './objects/NoteUpdateInput.schema';
import { NoteUncheckedUpdateInputObjectSchema } from './objects/NoteUncheckedUpdateInput.schema';

export const NoteUpsertSchema = z.object({ select: NoteSelectObjectSchema.optional(), include: NoteIncludeObjectSchema.optional(), where: NoteWhereUniqueInputObjectSchema, create: z.union([ NoteCreateInputObjectSchema, NoteUncheckedCreateInputObjectSchema ]), update: z.union([ NoteUpdateInputObjectSchema, NoteUncheckedUpdateInputObjectSchema ])  })