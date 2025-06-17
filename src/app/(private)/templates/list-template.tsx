"use client";

import { BaseCard } from "@/components/(bases)/(card)/base-card";
import { copyTemplates } from "@/db/schema";
import { format } from "date-fns";
import { FileText } from "lucide-react";

interface ListTemplateProps {
  templates: (typeof copyTemplates.$inferSelect)[];
}

export const ListTemplate = ({ templates }: ListTemplateProps) => {
  return templates.map((template) => (
    <BaseCard
      key={template.id}
      title={template.title}
      description={template.prompt}
      Icon={FileText}
      onDelete={() => {}}
      onEdit={() => {}}
      onUseTemplate={() => {}}
      date={format(template.createdAt ?? new Date(), "dd 'de' LLL 'de' yyyy")}
    />
  ));
};
