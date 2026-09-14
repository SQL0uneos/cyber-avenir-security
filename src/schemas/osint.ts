import { z } from 'zod';

export const osintQuerySchema = z.object({
  targetType: z.enum(['username', 'email', 'domain', 'name']),
  targetValue: z.string().min(2, 'Veuillez saisir au moins 2 caractères').max(150),
});

export type OsintQueryInput = z.infer<typeof osintQuerySchema>;
