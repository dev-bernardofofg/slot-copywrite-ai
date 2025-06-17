import { formatCurrency } from "@/helpers/number";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface BaseStatsProps {
  title: string;
  Icon?: LucideIcon;
  value?: number;
  type?: "currency" | "number" | "percentage";
  description?: string;
  color?: string;
  subtitle?: string;
  date?: string;
  action?: ReactNode;
}

export const BaseStats = ({
  title,
  Icon,
  value,
  type,
  description,
  color,
  subtitle,
  date,
  action,
}: BaseStatsProps) => {
  const formattedValue = () => {
    switch (type) {
      case "currency":
        return formatCurrency(value ?? 0);
      case "number":
        return value;
      case "percentage":
        return `${value}%`;
      default:
        return value;
    }
  };

  return (
    <div className="border border-border bg-background/70 bg-gradient-to-br from-background to-background/70 rounded-xl p-5 shadow-md flex flex-col gap-4 min-w-[280px]">
      <div className="flex flex-col gap-1">
        <h3 className="text-foreground text-xl font-bold leading-tight break-words">
          {title}
        </h3>
        {subtitle && (
          <span className="text-muted-foreground text-base font-medium">
            {subtitle}
          </span>
        )}
      </div>
      {(date || action) && (
        <div className="flex items-center justify-between mt-2">
          {date && (
            <span className="bg-muted-foreground text-white text-xs font-semibold rounded-full px-4 py-1">
              {date}
            </span>
          )}
          {action && (
            <div className="ml-auto text-primary text-sm font-semibold cursor-pointer hover:underline">
              {action}
            </div>
          )}
        </div>
      )}
      {(value !== undefined || Icon || description) && (
        <div className="flex items-center gap-2 mt-2">
          {Icon && (
            <div
              className={`flex items-center justify-center rounded-full p-2 ${color ?? "bg-primary"}`}
            >
              <Icon className="text-primary-foreground size-4" />
            </div>
          )}
          {value !== undefined && (
            <p className="text-2xl font-bold text-white">{formattedValue()}</p>
          )}
          {description && (
            <p className="text-sm text-[#b3a6d6] ml-2">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};
