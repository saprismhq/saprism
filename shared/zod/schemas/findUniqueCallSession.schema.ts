import { z } from 'zod';
import { CallSessionSelectObjectSchema } from './objects/CallSessionSelect.schema';
import { CallSessionIncludeObjectSchema } from './objects/CallSessionInclude.schema';
import { CallSessionWhereUniqueInputObjectSchema } from './objects/CallSessionWhereUniqueInput.schema';

export const CallSessionFindUniqueSchema = z.object({ select: CallSessionSelectObjectSchema.optional(), include: CallSessionIncludeObjectSchema.optional(), where: CallSessionWhereUniqueInputObjectSchema })