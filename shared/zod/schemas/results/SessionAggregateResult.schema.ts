import { z } from 'zod';
export const SessionAggregateResultSchema = z.object({  _count: z.object({
    sid: z.number(),
    sess: z.number(),
    expire: z.number()
  }).optional(),
  _min: z.object({
    sid: z.string().nullable(),
    expire: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    sid: z.string().nullable(),
    expire: z.date().nullable()
  }).nullable().optional()});