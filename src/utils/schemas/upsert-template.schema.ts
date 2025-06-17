import { z } from "zod";

export const UpsertTemplateSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string(),
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  prompt: z.string().min(1, "Prompt is required"),
});

export type UpsertTemplateSchema = z.infer<typeof UpsertTemplateSchema>;

export const UpsertDefaultValues: Partial<UpsertTemplateSchema> = {
  title: "",
  prompt: "",
};
