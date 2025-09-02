import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { NoteIncludeObjectSchema } from './objects/NoteInclude.schema';
import { NoteOrderByWithRelationInputObjectSchema } from './objects/NoteOrderByWithRelationInput.schema';
import { NoteWhereInputObjectSchema } from './objects/NoteWhereInput.schema';
import { NoteWhereUniqueInputObjectSchema } from './objects/NoteWhereUniqueInput.schema';
import { NoteScalarFieldEnumSchema } from './enums/NoteScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const NoteFindManySelectSchema: z.ZodType<Prisma.NoteSelect> = z.object({
    id: z.boolean().optional(),
    meetingId: z.boolean().optional(),
    content: z.boolean().optional(),
    aiAnalysis: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    meeting: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.NoteSelect>;

export const NoteFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    meetingId: z.boolean().optional(),
    content: z.boolean().optional(),
    aiAnalysis: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    meeting: z.boolean().optional()
  }).strict();

export const NoteFindManySchema: z.ZodType<Prisma.NoteFindManyArgs> = z.object({ select: NoteFindManySelectSchema.optional(), include: z.lazy(() => NoteIncludeObjectSchema.optional()), orderBy: z.union([NoteOrderByWithRelationInputObjectSchema, NoteOrderByWithRelationInputObjectSchema.array()]).optional(), where: NoteWhereInputObjectSchema.optional(), cursor: NoteWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([NoteScalarFieldEnumSchema, NoteScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.NoteFindManyArgs>;

export const NoteFindManyZodSchema = z.object({ select: NoteFindManySelectSchema.optional(), include: z.lazy(() => NoteIncludeObjectSchema.optional()), orderBy: z.union([NoteOrderByWithRelationInputObjectSchema, NoteOrderByWithRelationInputObjectSchema.array()]).optional(), where: NoteWhereInputObjectSchema.optional(), cursor: NoteWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([NoteScalarFieldEnumSchema, NoteScalarFieldEnumSchema.array()]).optional() }).strict();