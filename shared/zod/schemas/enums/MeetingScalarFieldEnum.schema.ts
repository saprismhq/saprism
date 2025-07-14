import { z } from 'zod';

export const MeetingScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'clientName',
  'clientCompany',
  'status',
  'createdAt',
  'updatedAt',
]);
