import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserIncludeObjectSchema } from './objects/UserInclude.schema';
import { UserOrderByWithRelationInputObjectSchema } from './objects/UserOrderByWithRelationInput.schema';
import { UserWhereInputObjectSchema } from './objects/UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';
import { UserScalarFieldEnumSchema } from './enums/UserScalarFieldEnum.schema';
import { UserCountOutputTypeArgsObjectSchema } from './objects/UserCountOutputTypeArgs.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserFindManySelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    firstName: z.boolean().optional(),
    lastName: z.boolean().optional(),
    profileImageUrl: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    meetings: z.boolean().optional(),
    clients: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UserSelect>;

export const UserFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    firstName: z.boolean().optional(),
    lastName: z.boolean().optional(),
    profileImageUrl: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    meetings: z.boolean().optional(),
    clients: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const UserFindManySchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({ select: UserFindManySelectSchema.optional(), include: z.lazy(() => UserIncludeObjectSchema.optional()), orderBy: z.union([UserOrderByWithRelationInputObjectSchema, UserOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserWhereInputObjectSchema.optional(), cursor: UserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UserFindManyArgs>;

export const UserFindManyZodSchema = z.object({ select: UserFindManySelectSchema.optional(), include: z.lazy(() => UserIncludeObjectSchema.optional()), orderBy: z.union([UserOrderByWithRelationInputObjectSchema, UserOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserWhereInputObjectSchema.optional(), cursor: UserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional() }).strict();