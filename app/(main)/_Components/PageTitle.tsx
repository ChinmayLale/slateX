"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useTitleEditor, useTitleEditorForInput } from "@/hooks/useTitleEditor";
import { updateTitleForPageService } from "@/services/document.service";
import { UpdatePageTitleInDocumentReducer } from "@/store/slices/documentSlice";
// import { Page } from "@/types";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useDebounceCallback } from "usehooks-ts";

interface PageTitleProps {
  initialTitle: string;
  pageId: string;
  documentId: string;
}

function PageTitle({ initialTitle, documentId, pageId }: PageTitleProps) {
  const {
    inputRef,
    title,
    isEditing,
    saving,
    enableInput,
    disableInput,
    onInputChange,
    onKeyDown,
  } = useTitleEditorForInput({
    initialTitle: initialTitle || "Untitled Page",
    onSaveSuccess: (newTitle) => {
      console.log("Title saved successfully:", newTitle);
    },
    onSaveError: (error) => {
      console.error("Failed to save title:", error);
    },
  });

  return (
    <div className="flex items-center gap-x-1">
      {isEditing ? (
        <Input
          className="h-7 px-2 focus:ring-0 focus-visible:ring-0 focus:outline-none"
          ref={inputRef}
          value={title}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          onBlur={disableInput}
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="font-medium h-auto p-1"
        >
          {title || "Untitled"}
          {saving && (
            <span className="ml-1 text-xs text-muted-foreground">•</span>
          )}
        </Button>
      )}
    </div>
  );
}

PageTitle.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-16 rounded-md bg-primary/5" />;
};

export default PageTitle;
