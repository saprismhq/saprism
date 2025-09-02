import { z } from 'zod';
import { CallSessionSelectObjectSchema } from './objects/CallSessionSelect.schema';
import { CallSessionIncludeObjectSchema } from './objects/CallSessionInclude.schema';
import { CallSessionCreateInputObjectSchema } from './objects/CallSessionCreateInput.schema';
import { CallSessionUncheckedCreateInputObjectSchema } from './objects/CallSessionUncheckedCreateInput.schema';

export const CallSessionCreateOneSchema = z.object({ select: CallSessionSelectObjectSchema.optional(), include: CallSessionIncludeObjectSchema.optional(), data: z.union([CallSessionCreateInputObjectSchema, CallSessionUncheckedCreateInputObjectSchema])  })