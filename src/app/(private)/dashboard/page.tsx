import { getActiveConversations } from "@/actions/metrics/get-active-conversations";
import { BaseCard } from "@/components/(bases)/(card)/base-card";
import { BaseStats } from "@/components/(bases)/(stats)/base-stats";
import { BaseButton } from "@/components/(bases)/base-button";
import { Fade } from "@/components/(motions)/fade";
import { getCurrentUser } from "@/lib/session";
import { FileText, MessageSquare, Search, Sparkles } from "lucide-react";
import Link from "next/link";
// Importe as outras actions quando criadas
// import { getTotalConversations } from "@/actions/metrics/get-total-conversations";
// import { getTotalSearches } from "@/actions/metrics/get-total-searches";

const DashboardPage = async () => {
  const session = await getCurrentUser();
  const activeConversations = await getActiveConversations();
  // const totalConversations = await getTotalConversations();
  // const totalSearches = await getTotalSearches();

  return (
    <Fade>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Bem-vindo de volta, {session.name ?? "Usuário"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <BaseStats
          title="Total Ativas"
          description="+2 de ontem"
          Icon={MessageSquare}
          value={activeConversations?.data?.count ?? 0}
          type="number"
          color="bg-blue-200"
        />
        <BaseStats
          title="Total Criados"
          description="+1 esta semana"
          Icon={FileText}
          value={100} // totalConversations.count
          type="number"
          color="bg-purple-200"
        />
        <BaseStats
          title="Buscas Realizadas"
          description="Hoje"
          Icon={Search}
          value={100} // totalSearches.count
          type="number"
          color="bg-pink-200"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <BaseCard
          title="Nova Conversa"
          description="Inicie uma nova conversa com a IA para gerar copy personalizado"
          Icon={Sparkles}
          variant="blue"
          content={
            <BaseButton variant="outline" className="w-full">
              <Link href="/chat">Iniciar Conversa</Link>
            </BaseButton>
          }
        />
        <BaseCard
          title="Novo Template"
          description="Crie um template reutilizável para acelerar seu workflow"
          Icon={Sparkles}
          variant="purple"
          content={
            <BaseButton variant="outline" className="w-full">
              Criar Template
            </BaseButton>
          }
        />
      </div>
    </Fade>
  );
};

export default DashboardPage;
