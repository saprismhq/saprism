import { z } from 'zod';

export const SessionScalarFieldEnumSchema = z.enum(['sid', 'sess', 'expire'])