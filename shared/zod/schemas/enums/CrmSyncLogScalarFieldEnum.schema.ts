import { z } from 'zod';

export const CrmSyncLogScalarFieldEnumSchema = z.enum([
  'id',
  'meetingId',
  'status',
  'syncData',
  'error',
  'createdAt',
]);
