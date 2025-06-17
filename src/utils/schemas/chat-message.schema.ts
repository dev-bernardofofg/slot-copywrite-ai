import { z } from "zod";

export const chatMessageSchema = z.object({
  message: z.string().min(1, "Digite uma mensagem"),
});

export type ChatMessageSchema = z.infer<typeof chatMessageSchema>;
