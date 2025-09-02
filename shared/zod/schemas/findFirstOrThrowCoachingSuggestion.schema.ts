import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CoachingSuggestionIncludeObjectSchema } from './objects/CoachingSuggestionInclude.schema';
import { CoachingSuggestionOrderByWithRelationInputObjectSchema } from './objects/CoachingSuggestionOrderByWithRelationInput.schema';
import { CoachingSuggestionWhereInputObjectSchema } from './objects/CoachingSuggestionWhereInput.schema';
import { CoachingSuggestionWhereUniqueInputObjectSchema } from './objects/CoachingSuggestionWhereUniqueInput.schema';
import { CoachingSuggestionScalarFieldEnumSchema } from './enums/CoachingSuggestionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CoachingSuggestionFindFirstOrThrowSelectSchema: z.ZodType<Prisma.CoachingSuggestionSelect> = z.object({
    id: z.boolean().optional(),
    meetingId: z.boolean().optional(),
    type: z.boolean().optional(),
    content: z.boolean().optional(),
    isUsed: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    meeting: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CoachingSuggestionSelect>;

export const CoachingSuggestionFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    meetingId: z.boolean().optional(),
    type: z.boolean().optional(),
    content: z.boolean().optional(),
    isUsed: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    meeting: z.boolean().optional()
  }).strict();

export const CoachingSuggestionFindFirstOrThrowSchema: z.ZodType<Prisma.CoachingSuggestionFindFirstOrThrowArgs> = z.object({ select: CoachingSuggestionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => CoachingSuggestionIncludeObjectSchema.optional()), orderBy: z.union([CoachingSuggestionOrderByWithRelationInputObjectSchema, CoachingSuggestionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CoachingSuggestionWhereInputObjectSchema.optional(), cursor: CoachingSuggestionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CoachingSuggestionScalarFieldEnumSchema, CoachingSuggestionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CoachingSuggestionFindFirstOrThrowArgs>;

export const CoachingSuggestionFindFirstOrThrowZodSchema = z.object({ select: CoachingSuggestionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => CoachingSuggestionIncludeObjectSchema.optional()), orderBy: z.union([CoachingSuggestionOrderByWithRelationInputObjectSchema, CoachingSuggestionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CoachingSuggestionWhereInputObjectSchema.optional(), cursor: CoachingSuggestionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CoachingSuggestionScalarFieldEnumSchema, CoachingSuggestionScalarFieldEnumSchema.array()]).optional() }).strict();