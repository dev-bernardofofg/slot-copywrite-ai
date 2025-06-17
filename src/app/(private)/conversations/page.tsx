import { BaseStats } from "@/components/(bases)/(stats)/base-stats";
import { BaseButton } from "@/components/(bases)/base-button";
import { Header } from "@/components/(layouts)/header";
import { Fade } from "@/components/(motions)/fade";
import Link from "next/link";

const ConversationsPage = () => {
  return (
    <Fade>
      <Header
        title="Conversations"
        description="Manage your conversations"
        actions={
          <BaseButton clickAction="create" variant="outline">
            <Link href="/chat">New Conversation</Link>
          </BaseButton>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <BaseStats
          title="Email Marketing para E-commerce"
          subtitle="8 mensagens"
          date="14 de jan. de 2024"
          action={
            <Link href="#" className="text-primary">
              Continuar
            </Link>
          }
        />
        <BaseStats
          title="Email Marketing para E-commerce"
          subtitle="8 mensagens"
          date="14 de jan. de 2024"
          action={
            <Link href="#" className="text-primary">
              Continuar
            </Link>
          }
        />
        <BaseStats
          title="Email Marketing para E-commerce"
          subtitle="8 mensagens"
          date="14 de jan. de 2024"
          action={
            <Link href="#" className="text-primary">
              Continuar
            </Link>
          }
        />
      </div>
    </Fade>
  );
};

export default ConversationsPage;
