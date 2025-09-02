import { z } from 'zod';
import { NoteSelectObjectSchema } from './objects/NoteSelect.schema';
import { NoteUpdateManyMutationInputObjectSchema } from './objects/NoteUpdateManyMutationInput.schema';
import { NoteWhereInputObjectSchema } from './objects/NoteWhereInput.schema';

export const NoteUpdateManyAndReturnSchema = z.object({ select: NoteSelectObjectSchema.optional(), data: NoteUpdateManyMutationInputObjectSchema, where: NoteWhereInputObjectSchema.optional()  }).strict()