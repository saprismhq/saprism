import { z } from 'zod';

export const ClientScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'name',
  'company',
  'email',
  'phone',
  'industry',
  'notes',
  'createdAt',
  'updatedAt',
]);
