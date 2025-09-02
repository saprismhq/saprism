import { z } from 'zod';
import { NoteSelectObjectSchema } from './objects/NoteSelect.schema';
import { NoteCreateManyInputObjectSchema } from './objects/NoteCreateManyInput.schema';

export const NoteCreateManyAndReturnSchema = z.object({ select: NoteSelectObjectSchema.optional(), data: z.union([ NoteCreateManyInputObjectSchema, z.array(NoteCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()