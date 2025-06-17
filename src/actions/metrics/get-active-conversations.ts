"use server";

import { db } from "@/db";
import { actionClient } from "@/lib/next-safe-action";

export const getActiveConversations = actionClient.action(async () => {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const active = await db.query.conversations.findMany({
    where: (c, { gte }) => gte(c.createdAt, since),
  });
  return { count: active.length };
});
