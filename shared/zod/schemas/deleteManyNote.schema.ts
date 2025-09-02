import { z } from 'zod';
import { NoteWhereInputObjectSchema } from './objects/NoteWhereInput.schema';

export const NoteDeleteManySchema = z.object({ where: NoteWhereInputObjectSchema.optional()  })