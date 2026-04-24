import { Info } from "lucide-react";
import { ComponentType } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ComponentType<{ className?: string }>;
  className?: string;
  dataOcid?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = Info,
  className = "",
  dataOcid,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 gap-3 ${className}`}
      data-ocid={dataOcid}
    >
      {/* Icon container */}
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Icon className="w-7 h-7 text-primary opacity-60" />
      </div>

      {/* Text content */}
      <div className="text-center">
        <p className="font-display font-semibold text-foreground text-base">
          {title}
        </p>
        {description && (
          <p className="text-sm font-body text-muted-foreground mt-1 max-w-xs mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* Optional action button */}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="flex items-center gap-2 glass px-5 py-2.5 rounded-xl border border-primary/30 text-primary text-sm font-body font-medium hover:bg-primary/10 transition-smooth"
          data-ocid={`${dataOcid ?? "empty_state"}.action_button`}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
