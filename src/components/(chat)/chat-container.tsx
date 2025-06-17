"use client";

import { generateResponse } from "@/actions/ai/generate-response";
import { upsertConversation } from "@/actions/conversations";
import { BaseCard } from "@/components/(bases)/(card)/base-card";
import { ChatInputForm } from "@/components/(chat)/chat-input-form";
import { Card, CardContent } from "@/components/ui/card";
import { copyTemplates } from "@/db/schema";
import { useMessages, useSendMessage } from "@/hooks/use-messages";
import { Brain, FileText } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BaseButton } from "../(bases)/base-button";

// Tipos para mensagens e template
interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: Date;
  conversationId: string;
}

interface ChatContainerProps {
  templates: (typeof copyTemplates.$inferSelect)[];
}

export function ChatContainer({ templates }: ChatContainerProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<
    typeof copyTemplates.$inferSelect | null
  >(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const { data, isLoading } = useMessages(conversationId);
  const sendMessage = useSendMessage(conversationId);
  const router = useRouter();
  const searchParams = useSearchParams(); // nunca é null no Next.js App Router

  // Apenas para criar conversa
  const { execute: executeUpsertConversation } = useAction(upsertConversation, {
    onSuccess: (data) => {
      const newId = data.data?.id || null;
      setConversationId(newId);
      // Se não há conversationId na URL, seta na URL
      if (newId && searchParams && !searchParams.get("conversationId")) {
        const params = new URLSearchParams(window.location.search);
        params.set("conversationId", newId);
        router.replace(`?${params.toString()}`);
      }
    },
    onError: (error) => {
      toast.error("Erro ao criar conversa");
      console.error(error);
    },
  });

  // Ao montar, se houver conversationId na URL, use ele
  useEffect(() => {
    const urlId = searchParams && searchParams.get("conversationId");
    if (urlId && urlId !== conversationId) {
      setConversationId(urlId);
    } else if (!urlId && !conversationId) {
      // Se não há conversationId na URL nem no estado, cria uma nova conversa
      executeUpsertConversation({ title: "Nova conversa" });
    }
  }, [searchParams, conversationId, executeUpsertConversation]);

  async function handleSendMessage(message: string) {
    if (!message.trim()) return;
    if (!conversationId) {
      toast.error(
        "Conversa ainda não foi criada. Tente novamente em instantes."
      );
      return;
    }
    // Envia mensagem do usuário
    await sendMessage.mutateAsync({ content: message, role: "user" });
    // Gerar resposta da IA
    setIsTyping(true);
    const aiResponse = await generateResponse({
      prompt: message,
      template: selectedTemplate?.prompt,
      conversationId,
    });
    if (aiResponse?.data?.response) {
      await sendMessage.mutateAsync({
        content: aiResponse.data.response,
        role: "assistant",
      });
    }
    setIsTyping(false);
  }

  function handleUseTemplate(template: typeof copyTemplates.$inferSelect) {
    setSelectedTemplate(template);
    setCurrentMessage(template.prompt);
  }

  // Função para criar nova conversa manualmente
  function handleNewConversation() {
    // Só permite criar nova conversa se já houver pelo menos uma mensagem
    if (!data || data.length === 0) {
      toast.error(
        "Envie pelo menos uma mensagem antes de criar uma nova conversa."
      );
      return;
    }
    setConversationId(null);
    setCurrentMessage("");
    setSelectedTemplate(null);
    // Remove o conversationId da URL
    const params = new URLSearchParams(window.location.search);
    params.delete("conversationId");
    router.replace(`?${params.toString()}`);
    // Cria nova conversa
    executeUpsertConversation({ title: "Nova conversa" });
  }

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Chat with AI</h2>
          <p className="text-muted-foreground">
            Talk directly with the AI or use a template
          </p>
        </div>
        <BaseButton
          clickAction="create"
          variant="outline"
          onClick={handleNewConversation}
          className="w-fit"
        >
          Criar nova conversa
        </BaseButton>
      </div>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <BaseCard
            title="Fast Templates"
            description="Use a template to generate a message"
            Icon={FileText}
            content={
              <div className="space-y-2">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleUseTemplate(template)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedTemplate?.id === template.id
                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30"
                        : "bg-slate-700/30 hover:bg-slate-700/50"
                    }`}
                  >
                    <div className="text-foreground text-sm font-medium mb-1">
                      {template.title}
                    </div>
                    <div className="text-foreground/60 text-xs line-clamp-2">
                      {template.prompt}
                    </div>
                  </button>
                ))}
              </div>
            }
          />
        </div>
        <div className="lg:col-span-3 flex flex-col">
          <Card className="bg-background/70 backdrop-blur border-purple-600/30 flex-1 flex flex-col rounded-lg">
            <CardContent className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-24rem)]">
              {isLoading ? (
                <div>Carregando...</div>
              ) : !data || data.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                      Pronto para começar!
                    </h3>
                    <p className="text-muted-foreground">
                      Selecione um template ou digite sua mensagem abaixo
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.map((message: ChatMessage) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-slate-700/50 text-slate-200 border border-slate-600/50"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">
                          {message.content}
                        </div>
                        <div
                          className={`text-xs mt-2 ${
                            message.role === "user"
                              ? "text-blue-100"
                              : "text-slate-400"
                          }`}
                        >
                          {message.createdAt &&
                            new Date(message.createdAt).toLocaleTimeString(
                              "pt-BR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-slate-500/20 dark:from-blue-900 dark:via-purple-900 dark:to-plate-900 backdrop-blur-sm border-purple-600/30 text-foreground border  p-4 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            IA está digitando...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <div className="border-t border-slate-700/50 p-4">
              <ChatInputForm
                onSend={handleSendMessage}
                disabled={isTyping || !conversationId}
                value={currentMessage}
                onChange={setCurrentMessage}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
