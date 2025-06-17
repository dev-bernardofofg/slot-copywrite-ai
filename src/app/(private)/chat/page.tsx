import { getTemplates } from "@/app/services/templates.service";
import { ChatContainer } from "@/components/(chat)/chat-container";
import { Fade } from "@/components/(motions)/fade";
import { getCurrentUser } from "@/lib/session";

export default async function ChatPage() {
  const session = await getCurrentUser();
  const templates = await getTemplates(session.id);

  return (
    <Fade>
      <ChatContainer templates={templates} />
    </Fade>
  );
}
