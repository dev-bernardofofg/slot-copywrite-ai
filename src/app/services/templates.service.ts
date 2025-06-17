import { db } from "@/db";
import { copyTemplates } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getTemplates(userId: string) {
  return db.query.copyTemplates.findMany({
    where: eq(copyTemplates.userId, userId),
  });
}
