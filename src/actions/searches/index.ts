"use server";

import { db } from "@/db";
import { searches } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";
import { getCurrentUser } from "@/lib/session";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema para criar busca
const SearchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});

export type SearchSchema = z.infer<typeof SearchSchema>;

// Action para criar busca
export const createSearch = actionClient
  .schema(SearchSchema)
  .action(async ({ parsedInput }) => {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const searchId = randomUUID();

    await db.insert(searches).values({
      id: searchId,
      userId: user.id,
      query: parsedInput.query,
    });

    revalidatePath("/chat");
    return { success: true, id: searchId };
  });

// Action para listar buscas do usuário
export const getUserSearches = actionClient.action(async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const userSearches = await db.query.searches.findMany({
    where: (searches, { eq }) => eq(searches.userId, user.id),
    orderBy: (searches, { desc }) => [desc(searches.createdAt)],
  });

  return { searches: userSearches };
});
