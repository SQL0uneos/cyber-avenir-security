import { z } from 'zod';

export const leakCheckSchema = z.object({
  identifier: z
    .string()
    .min(3, 'Saisissez un email ou un pseudo valide')
    .refine(
      (val) => val.includes('@') || val.length >= 3,
      'Identifiant invalide'
    ),
});

export type LeakCheckInput = z.infer<typeof leakCheckSchema>;
