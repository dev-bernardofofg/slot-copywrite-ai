"use client";

import { BaseButton } from "@/components/(bases)/base-button";
import { BaseForm } from "@/components/(bases)/base-form";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { ChangeEvent, FormEvent } from "react";

interface ChatInputFormProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export function ChatInputForm({
  onSend,
  disabled,
  value,
  onChange,
}: ChatInputFormProps) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!disabled && value.trim()) {
      onSend(value);
      onChange("");
    }
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value);
  }

  return (
    <BaseForm onSubmit={handleSubmit}>
      <div className="grid grid-cols-12 gap-2">
        <Textarea
          value={value}
          onChange={handleChange}
          placeholder="Digite sua mensagem..."
          disabled={disabled}
          className="resize-none col-span-11"
        />
        <BaseButton
          type="submit"
          disabled={disabled || !value.trim()}
          className="self-end col-span-1 h-full"
        >
          <Send className="h-4 w-4" />
        </BaseButton>
      </div>
    </BaseForm>
  );
}
