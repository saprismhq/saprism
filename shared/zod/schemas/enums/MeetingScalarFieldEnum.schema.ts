import { z } from 'zod';

export const MeetingScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'clientId',
  'clientName',
  'clientCompany',
  'dealType',
  'status',
  'createdAt',
  'updatedAt',
]);
