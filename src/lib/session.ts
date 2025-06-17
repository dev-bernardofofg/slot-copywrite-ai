import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
};

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user as SessionUser;
}
