import { z } from 'zod';
import { CallSessionScalarWhereInputObjectSchema } from './CallSessionScalarWhereInput.schema';
import { CallSessionUpdateManyMutationInputObjectSchema } from './CallSessionUpdateManyMutationInput.schema';
import { CallSessionUncheckedUpdateManyWithoutCallSessionsInputObjectSchema } from './CallSessionUncheckedUpdateManyWithoutCallSessionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CallSessionUpdateManyWithWhereWithoutMeetingInput> =
  z
    .object({
      where: z.lazy(() => CallSessionScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CallSessionUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            CallSessionUncheckedUpdateManyWithoutCallSessionsInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const CallSessionUpdateManyWithWhereWithoutMeetingInputObjectSchema =
  Schema;
