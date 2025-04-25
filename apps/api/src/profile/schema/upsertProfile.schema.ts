import { z } from 'zod';

export const upsertProfileSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  bio: z.string().optional(),
  headline: z.string().optional(),
  photo: z.string().optional(),
  user: z.object({ email: z.string() }),
  tags: z.array(z.object({ id: z.string() })),
  deleteAt: z.date().optional(),
});

export type UpsertProfileDto = z.infer<typeof upsertProfileSchema>;
