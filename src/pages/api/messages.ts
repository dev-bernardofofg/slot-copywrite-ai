import { db } from "@/db";
import { messages } from "@/db/schema";
import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { conversationId } = req.query;
    if (!conversationId || typeof conversationId !== "string") {
      return res.status(400).json({ error: "Missing conversationId" });
    }
    try {
      const conversationMessages = await db.query.messages.findMany({
        where: (messages, { eq }) =>
          eq(messages.conversationId, conversationId),
        orderBy: (messages, { asc }) => [asc(messages.createdAt)],
      });
      return res.status(200).json({ messages: conversationMessages });
    } catch (error) {
      console.error("Error fetching messages:", error);
      return res.status(500).json({ error: "Failed to fetch messages" });
    }
  } else if (req.method === "POST") {
    const { conversationId, content, role } = req.body;
    if (!conversationId || !content || !role) {
      return res.status(400).json({ error: "Missing fields" });
    }
    try {
      const messageId = randomUUID();
      await db.insert(messages).values({
        id: messageId,
        conversationId,
        content,
        role,
      });
      return res.status(201).json({ success: true, id: messageId });
    } catch (error) {
      console.error("Error fetching messages:", error);
      return res.status(500).json({ error: "Failed to save message" });
    }
  } else {
    res.status(405).end();
  }
}
