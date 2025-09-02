import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ClientIncludeObjectSchema } from './objects/ClientInclude.schema';
import { ClientOrderByWithRelationInputObjectSchema } from './objects/ClientOrderByWithRelationInput.schema';
import { ClientWhereInputObjectSchema } from './objects/ClientWhereInput.schema';
import { ClientWhereUniqueInputObjectSchema } from './objects/ClientWhereUniqueInput.schema';
import { ClientScalarFieldEnumSchema } from './enums/ClientScalarFieldEnum.schema';
import { ClientCountOutputTypeArgsObjectSchema } from './objects/ClientCountOutputTypeArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ClientFindFirstOrThrowSelectSchema: z.ZodType<Prisma.ClientSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    name: z.boolean().optional(),
    company: z.boolean().optional(),
    email: z.boolean().optional(),
    phone: z.boolean().optional(),
    industry: z.boolean().optional(),
    salesMethodology: z.boolean().optional(),
    notes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional(),
    meetings: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ClientSelect>;

export const ClientFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    name: z.boolean().optional(),
    company: z.boolean().optional(),
    email: z.boolean().optional(),
    phone: z.boolean().optional(),
    industry: z.boolean().optional(),
    salesMethodology: z.boolean().optional(),
    notes: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional(),
    meetings: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const ClientFindFirstOrThrowSchema: z.ZodType<Prisma.ClientFindFirstOrThrowArgs> = z.object({ select: ClientFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ClientIncludeObjectSchema.optional()), orderBy: z.union([ClientOrderByWithRelationInputObjectSchema, ClientOrderByWithRelationInputObjectSchema.array()]).optional(), where: ClientWhereInputObjectSchema.optional(), cursor: ClientWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ClientScalarFieldEnumSchema, ClientScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ClientFindFirstOrThrowArgs>;

export const ClientFindFirstOrThrowZodSchema = z.object({ select: ClientFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ClientIncludeObjectSchema.optional()), orderBy: z.union([ClientOrderByWithRelationInputObjectSchema, ClientOrderByWithRelationInputObjectSchema.array()]).optional(), where: ClientWhereInputObjectSchema.optional(), cursor: ClientWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ClientScalarFieldEnumSchema, ClientScalarFieldEnumSchema.array()]).optional() }).strict();