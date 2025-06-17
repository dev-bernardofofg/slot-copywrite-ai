import { getTemplates } from "@/app/services/templates.service";
import { Header } from "@/components/(layouts)/header";
import { Fade } from "@/components/(motions)/fade";
import { getCurrentUser } from "@/lib/session";
import { UpsertTemplateForm } from "@/utils/forms/upsert-template.form";
import { ListTemplate } from "./list-template";

const TemplatePages = async () => {
  const session = await getCurrentUser();
  const templates = await getTemplates(session.id);

  return (
    <Fade>
      <Header
        title="Templates"
        description="Manage your templates"
        actions={<UpsertTemplateForm userId={session.id} />}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ListTemplate templates={templates} />
      </div>
    </Fade>
  );
};

export default TemplatePages;
