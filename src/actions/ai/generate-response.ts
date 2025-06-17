"use server";

import { db } from "@/db";
import { actionClient } from "@/lib/next-safe-action";
import { openai } from "@/lib/openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { z } from "zod";

const GenerateResponseSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  template: z.string().optional(),
  conversationId: z.string().uuid(),
});

export type GenerateResponseSchema = z.infer<typeof GenerateResponseSchema>;

export const generateResponse = actionClient
  .schema(GenerateResponseSchema)
  .action(async ({ parsedInput }) => {
    try {
      // Buscar histórico da conversa
      const history = await db.query.messages.findMany({
        where: (messages, { eq }) =>
          eq(messages.conversationId, parsedInput.conversationId),
        orderBy: (messages, { asc }) => [asc(messages.createdAt)],
      });

      // Montar array de mensagens para o OpenAI
      const messages: ChatCompletionMessageParam[] = [
        {
          role: "system",
          content: parsedInput.template || "You are a helpful assistant.",
        },
        ...history.map(
          (msg) =>
            ({
              role: msg.role,
              content: msg.content,
            }) as ChatCompletionMessageParam
        ),
        { role: "user", content: parsedInput.prompt },
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      const response = completion.choices[0]?.message?.content;

      if (!response) {
        throw new Error("No response from AI");
      }

      return { response };
    } catch (error) {
      console.error("Erro na action:", error);
      throw new Error("Failed to generate AI response");
    }
  });
