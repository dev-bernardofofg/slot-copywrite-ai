import { BaseButton } from "@/components/(bases)/base-button";
import { ToggleTheme } from "@/components/(clickable)/toggle-theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { headers } from "next/headers";

export const SidebarUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userName = session?.user?.name || "Usuário";
  const userEmail = session?.user?.email || "email@exemplo.com";
  const avatarFallback = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-full rounded-xl bg-gradient-to-br from-[#3a2563] to-[#43216b] p-6 flex flex-col items-center shadow-md">
      <div className="flex items-center w-full mb-6">
        <Avatar className="size-8 mr-4">
          <AvatarImage src="https://github.com/dev-bernardofofg.png" />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <span className="font-semibold text-white text-sm">{userName}</span>
          <span className="text-xs text-muted-foreground truncate max-w-[150px]">
            {userEmail}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <ToggleTheme />
        <BaseButton
          clickAction="sign-out"
          variant="ghost"
          size="icon"
          aria-label="Sair"
          className="text-muted-foreground hover:text-white w-8 flex items-center justify-center"
        >
          <LogOut className="w-6 h-6" />
        </BaseButton>
      </div>
    </div>
  );
};

export function useMessages(conversationId: string | null) {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      if (!conversationId) return [];
      const res = await fetch(`/api/messages?conversationId=${conversationId}`);
      const data = await res.json();
      return data.messages;
    },
    enabled: !!conversationId,
  });
}

export function useSendMessage(conversationId: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      content: string;
      role: "user" | "assistant";
    }) => {
      const res = await fetch(`/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, ...data }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    },
  });
}
