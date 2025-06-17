"use server";

import { db } from "@/db";
import { conversations } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";
import { getCurrentUser } from "@/lib/session";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema para criar/atualizar conversa
const ConversationSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
});

export type ConversationSchema = z.infer<typeof ConversationSchema>;

// Action para criar/atualizar conversa
export const upsertConversation = actionClient
  .schema(ConversationSchema)
  .action(async ({ parsedInput }) => {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const conversationId = parsedInput.id || randomUUID();

    await db
      .insert(conversations)
      .values({
        id: conversationId,
        userId: user.id,
        title: parsedInput.title,
      })
      .onConflictDoUpdate({
        target: [conversations.id],
        set: {
          title: parsedInput.title,
          updatedAt: new Date(),
        },
      });

    revalidatePath("/chat");
    return { success: true, id: conversationId };
  });

// Action para listar conversas
export const getConversations = actionClient.action(async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const userConversations = await db.query.conversations.findMany({
    where: (conversations, { eq }) => eq(conversations.userId, user.id),
    orderBy: (conversations, { desc }) => [desc(conversations.updatedAt)],
  });

  return { conversations: userConversations };
});
