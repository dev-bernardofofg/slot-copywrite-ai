"use client";

import { upsertTemplate } from "@/actions/upsert-templates";
import { BaseDialog } from "@/components/(bases)/(dialog)/base-dialog";
import { BaseInput } from "@/components/(bases)/(inputs)/base-input";
import { BaseTextarea } from "@/components/(bases)/(inputs)/base-textarea";
import { BaseButton } from "@/components/(bases)/base-button";
import { BaseForm } from "@/components/(bases)/base-form";
import { Form } from "@/components/ui/form";
import { copyTemplates } from "@/db/schema";
import {
  UpsertDefaultValues,
  UpsertTemplateSchema,
} from "@/utils/schemas/upsert-template.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UpsertTemplateFormProps {
  template?: typeof copyTemplates.$inferInsert;
  userId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const UpsertTemplateForm = ({
  template,
  userId,
  onSuccess,
  onCancel,
}: UpsertTemplateFormProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<UpsertTemplateSchema>({
    resolver: zodResolver(UpsertTemplateSchema),
    defaultValues: template
      ? {
          id: template.id,
          userId: template.userId,
          title: template.title,
          prompt: template.prompt,
        }
      : {
          ...UpsertDefaultValues,
          userId,
        },
  });

  const { execute, status } = useAction(upsertTemplate, {
    onSuccess: () => {
      toast.success(template ? "Template updated" : "Template created");
      form.reset();
      setOpen(false);
      onSuccess?.();
    },
    onError: (error) => {
      if (error && "error" in error) {
        const { error: actionError } = error;
        if (actionError.serverError) {
          toast.error(actionError.serverError);
        } else if (actionError.validationErrors?._errors?.[0]) {
          toast.error(actionError.validationErrors._errors[0]);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const handleSubmit = (data: UpsertTemplateSchema) => {
    execute(data);
  };

  const handleCancel = () => {
    form.reset();
    setOpen(false);
    onCancel?.();
  };

  return (
    <BaseDialog
      trigger={
        <BaseButton clickAction="create">
          {template ? "Edit Template" : "Create Template"}
        </BaseButton>
      }
      title={template ? "Edit Template" : "New Template"}
      description={
        template
          ? "Update your existing template"
          : "Create a new copywriting template"
      }
      open={open}
      setOpen={setOpen}
    >
      <Form {...form}>
        <BaseForm onSubmit={form.handleSubmit(handleSubmit)}>
          <BaseInput
            name="title"
            label="Title"
            placeholder="e.g. Product Description"
          />
          <BaseTextarea
            name="prompt"
            label="Prompt"
            description="Use [variables] for custom fields"
            placeholder="Write a compelling product description for [product_name] that highlights its [key_features]..."
          />
          <div className="grid grid-cols-2 gap-2">
            <BaseButton
              type="button"
              clickAction="create"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </BaseButton>
            <BaseButton
              type="submit"
              clickAction="create"
              isLoading={status === "executing"}
            >
              {template ? "Update" : "Create"}
            </BaseButton>
          </div>
        </BaseForm>
      </Form>
    </BaseDialog>
  );
};
