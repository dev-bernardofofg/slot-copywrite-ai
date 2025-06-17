import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
