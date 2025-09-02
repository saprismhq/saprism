import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { NoteIncludeObjectSchema } from './objects/NoteInclude.schema';
import { NoteOrderByWithRelationInputObjectSchema } from './objects/NoteOrderByWithRelationInput.schema';
import { NoteWhereInputObjectSchema } from './objects/NoteWhereInput.schema';
import { NoteWhereUniqueInputObjectSchema } from './objects/NoteWhereUniqueInput.schema';
import { NoteScalarFieldEnumSchema } from './enums/NoteScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const NoteFindFirstSelectSchema: z.ZodType<Prisma.NoteSelect> = z.object({
    id: z.boolean().optional(),
    meetingId: z.boolean().optional(),
    content: z.boolean().optional(),
    aiAnalysis: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    meeting: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.NoteSelect>;

export const NoteFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    meetingId: z.boolean().optional(),
    content: z.boolean().optional(),
    aiAnalysis: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    meeting: z.boolean().optional()
  }).strict();

export const NoteFindFirstSchema: z.ZodType<Prisma.NoteFindFirstArgs> = z.object({ select: NoteFindFirstSelectSchema.optional(), include: z.lazy(() => NoteIncludeObjectSchema.optional()), orderBy: z.union([NoteOrderByWithRelationInputObjectSchema, NoteOrderByWithRelationInputObjectSchema.array()]).optional(), where: NoteWhereInputObjectSchema.optional(), cursor: NoteWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([NoteScalarFieldEnumSchema, NoteScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.NoteFindFirstArgs>;

export const NoteFindFirstZodSchema = z.object({ select: NoteFindFirstSelectSchema.optional(), include: z.lazy(() => NoteIncludeObjectSchema.optional()), orderBy: z.union([NoteOrderByWithRelationInputObjectSchema, NoteOrderByWithRelationInputObjectSchema.array()]).optional(), where: NoteWhereInputObjectSchema.optional(), cursor: NoteWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([NoteScalarFieldEnumSchema, NoteScalarFieldEnumSchema.array()]).optional() }).strict();