import { z } from 'zod';
export const UserAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    email: z.number(),
    firstName: z.number(),
    lastName: z.number(),
    profileImageUrl: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    meetings: z.number(),
    clients: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    email: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    profileImageUrl: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    email: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    profileImageUrl: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});