import { z } from 'zod';

export const scamAnalysisSchema = z.object({
  inputType: z.enum(['url', 'text', 'image']),
  content: z.string().min(3, 'Le contenu à analyser ne peut pas être vide'),
});

export type ScamAnalysisInput = z.infer<typeof scamAnalysisSchema>;
