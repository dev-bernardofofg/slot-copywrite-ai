import { z } from "zod";

export const upsertTemplateSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  title: z.string().min(1),
  prompt: z.string().min(1),
});
