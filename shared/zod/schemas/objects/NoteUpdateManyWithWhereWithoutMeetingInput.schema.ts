import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NoteScalarWhereInputObjectSchema } from './NoteScalarWhereInput.schema';
import { NoteUpdateManyMutationInputObjectSchema } from './NoteUpdateManyMutationInput.schema';
import { NoteUncheckedUpdateManyWithoutMeetingInputObjectSchema } from './NoteUncheckedUpdateManyWithoutMeetingInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => NoteScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => NoteUpdateManyMutationInputObjectSchema), z.lazy(() => NoteUncheckedUpdateManyWithoutMeetingInputObjectSchema)])
}).strict();
export const NoteUpdateManyWithWhereWithoutMeetingInputObjectSchema: z.ZodType<Prisma.NoteUpdateManyWithWhereWithoutMeetingInput> = makeSchema() as unknown as z.ZodType<Prisma.NoteUpdateManyWithWhereWithoutMeetingInput>;
export const NoteUpdateManyWithWhereWithoutMeetingInputObjectZodSchema = makeSchema();
