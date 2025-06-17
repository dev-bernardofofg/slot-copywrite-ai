"use server";

import { db } from "@/db";
import { copyTemplates } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";
import { getCurrentUser } from "@/lib/session";
import { UpsertTemplateSchema } from "@/utils/schemas/upsert-template.schema";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export const upsertTemplate = actionClient
  .schema(UpsertTemplateSchema)
  .action(async ({ parsedInput }) => {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const templateId = parsedInput.id || randomUUID();

    await db
      .insert(copyTemplates)
      .values({
        id: templateId,
        userId: user.id,
        title: parsedInput.title,
        prompt: parsedInput.prompt,
      })
      .onConflictDoUpdate({
        target: [copyTemplates.id],
        set: {
          title: parsedInput.title,
          prompt: parsedInput.prompt,
          updatedAt: new Date(),
        },
      });

    revalidatePath("/templates");

    return { success: true };
  });
