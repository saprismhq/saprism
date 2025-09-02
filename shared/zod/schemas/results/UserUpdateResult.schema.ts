import { z } from 'zod';
export const UserUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  email: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profileImageUrl: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  meetings: z.array(z.unknown()),
  clients: z.array(z.unknown())
}));