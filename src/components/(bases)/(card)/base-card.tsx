import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon, Pen, Trash } from "lucide-react";
import { BaseButton } from "../base-button";

const baseCardVariants = cva(
  "backdrop-blur-sm border-blue-500/30 bg-background/70",
  {
    variants: {
      variant: {
        blue: "bg-gradient-to-br from-blue-600/20 to-purple-600/20",
        purple: "bg-gradient-to-br from-purple-600/20 to-blue-600/20",
        default: "bg-background/70 backdrop-blur border-purple-600/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BaseCardProps extends VariantProps<typeof baseCardVariants> {
  title: string;
  description: string;
  Icon: LucideIcon;
  className?: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  templateStyle?: boolean;
  date?: string;
  onUseTemplate?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const BaseCard = ({
  title,
  description,
  Icon,
  variant,
  content,
  className,
  children,
  templateStyle = false,
  date,
  onUseTemplate,
  onEdit,
  onDelete,
}: BaseCardProps) => {
  const templateClasses = templateStyle
    ? "border border-purple-500 bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] text-white shadow-lg"
    : "";

  return (
    <Card
      className={cn(
        baseCardVariants({ variant }),
        templateClasses,
        className,
        "group relative"
      )}
    >
      <CardHeader className={cn("min-h-16", templateStyle && "text-white")}>
        <CardTitle
          className={cn(
            "flex items-center gap-2",
            templateStyle && "text-white"
          )}
        >
          <Icon className="h-4 w-4" />
          {title}
        </CardTitle>
        <CardDescription className={templateStyle ? "text-white/80" : ""}>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>{children ? children : content}</CardContent>

      {(date || onUseTemplate || onEdit || onDelete) && (
        <div className="flex items-center justify-between px-6 pb-4 pt-2 relative">
          {(onEdit || onDelete) && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-32 right-2">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="p-1 rounded hover:bg-slate-700/40"
                  title="Editar"
                >
                  <Pen className="size-4" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="p-1 rounded hover:bg-slate-700/40"
                  title="Apagar"
                >
                  <Trash className="size-4" />
                </button>
              )}
            </div>
          )}
          {date && (
            <span className="text-xs rounded-full bg-slate-700/60 px-3 py-1 text-slate-100">
              {date}
            </span>
          )}
          <div className="flex items-center gap-2 ml-auto">
            {onUseTemplate && (
              <BaseButton onClick={onUseTemplate}>Usar Template</BaseButton>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
