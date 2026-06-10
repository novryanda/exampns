import { z } from 'zod';

export const checkSampleAnswersSchema = z.object({
  sessionToken: z.string().min(1),
  answers: z
    .array(
      z.object({
        questionId: z.string().uuid(),
        selectedLabel: z.string().min(1).max(1),
      }),
    )
    .min(1)
    .max(5),
});

export type CheckSampleAnswersInput = z.infer<typeof checkSampleAnswersSchema>;
