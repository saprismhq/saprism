import { z } from 'zod';
import { CrmSyncLogSelectObjectSchema } from './objects/CrmSyncLogSelect.schema';
import { CrmSyncLogIncludeObjectSchema } from './objects/CrmSyncLogInclude.schema';
import { CrmSyncLogWhereUniqueInputObjectSchema } from './objects/CrmSyncLogWhereUniqueInput.schema';

export const CrmSyncLogFindUniqueOrThrowSchema = z.object({ select: CrmSyncLogSelectObjectSchema.optional(), include: CrmSyncLogIncludeObjectSchema.optional(), where: CrmSyncLogWhereUniqueInputObjectSchema })