import { z } from 'zod';
export const ClientAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    name: z.number(),
    company: z.number(),
    email: z.number(),
    phone: z.number(),
    industry: z.number(),
    salesMethodology: z.number(),
    notes: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    user: z.number(),
    meetings: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    company: z.string().nullable(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    industry: z.string().nullable(),
    salesMethodology: z.string().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    company: z.string().nullable(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    industry: z.string().nullable(),
    salesMethodology: z.string().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});