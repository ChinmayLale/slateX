"use client";
import React from "react";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  TrashIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { DialogCloseButton } from "./DialogCloseButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import { archiveDocumentById } from "@/services/document.service";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { archiveDocumentByIdReducer } from "@/store/slices/documentSlice";
import { toggleDocumentDeleted } from "@/store/slices/misc.slice";

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
  showAddButton?: boolean;
  onAdd?: () => void;
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
  showAddButton = false,
  onAdd,
  ...props
}: ItemProps) {
  const [open, setOpen] = React.useState(false);
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const { user } = useUser();
  const dispatch = useDispatch();
  const onExpandClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onAddClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation(); // Add this line
    setOpen(true);
    // Call the onAdd prop if provided
    onAdd?.();
  };

  // Prevent parent onClick when clicking on interactive elements
  const handleMainClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click target is the add button or its children
    const target = event.target as HTMLElement;
    const isAddButton = target.closest("[data-add-button]");
    const isExpandButton = target.closest("[data-expand-button]");

    // Only trigger onClick if not clicking on interactive elements
    if (!isAddButton && !isExpandButton) {
      onClick();
    }
  };

  const handleDeleteClick = async (id: string) => {
    const data = archiveDocumentById(id);
    toast.promise(data, {
      loading: "Moving To Trash...",
      success: "Page moved to trash successfully",
      error: "Failed to move page to trash",
    });

    const page = await data;
    if (!page) {
      toast.error("Failed to delete page");
      return;
    }

    dispatch(archiveDocumentByIdReducer(id));
  };

  return (
    <div
      onClick={handleMainClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px ` : "12px" }}
      className={cn(
        `group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium`,
        active && "bg-primary/5 text-primary"
      )}
    >
      <DialogCloseButton open={open} onOpenChange={setOpen} id={id ? id : ""} />

      {!!id && onExpand && (
        <div
          data-expand-button // Add data attribute for identification
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1 p-0.5"
          role="button"
          onClick={onExpandClick}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
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

      {showAddButton && (
        <div className="ml-auto flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 cursor-pointer"
              >
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="bottom"
              forceMount
            >
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(id || "");
                }}
              >
                <TrashIcon className="h-4 w-4 mr-4" /> Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-1">
                Last edited by{" "}
                <span className="font-semibold">
                  {user?.firstName || "you"}
                </span>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            data-add-button // Add data attribute for identification
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 p-0.5 cursor-pointer"
            role="button"
            onClick={onAddClick}
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
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
      <Skeleton className="h-4 w-4 bg-primary/5" />
      <Skeleton className="h-4 w-[30%] bg-primary/5" />
    </div>
  );
};

export default Item;
