"use client";
import React from "react";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ItemProps {
  id?: string;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}

function Item({
  label,
  onClick,
  icon: Icon,
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
  ...props
}: ItemProps) {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const onExpandClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px ` : "12px" }}
      className={cn(
        `group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium`,
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id &&
        onExpand && ( // Only show chevron if onExpand is provided
          <div
            className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1 p-0.5" // Fixed: added padding and hover state
            role="button"
            onClick={onExpandClick}
          >
            <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />{" "}
            {/* Fixed: corrected size classes */}
          </div>
        )}

      {documentIcon ? (
        <div className="mr-2 shrink-0 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-[1.5px] font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-sm">⌘</span> k
        </kbd>
      )}
    </div>
  );
}

Item.Skeleton = function ItemSkeleton({ level }: { level: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px ` : "12px",
      }}
      className="flex gap-x-2 py-2"
    >
      <Skeleton className="h-4 w-4" /> {/* Fixed: corrected size classes */}
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Item;
