"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialTitle);
  const [saving, setSaving] = useState(false);
  const [editing, setIsEditing] = useState(false);
  const [lastSavedTitle, setLastSavedTitle] = useState(initialTitle);
  const dispatch = useDispatch();

  const saveTitle = useDebounceCallback(async (newTitle: string) => {
    // Don't save if title hasn't actually changed
    if (newTitle === lastSavedTitle) return;

    setSaving(true);

    try {
      const res = await updateTitleForPageService(documentId, pageId, newTitle);

      if (res) {
        setLastSavedTitle(newTitle);
        dispatch(
          UpdatePageTitleInDocumentReducer({
            documentId,
            pageId,
            title: newTitle,
          })
        );
      }
    } catch (error) {
      console.error(error);
      // Revert to last saved title on error
      setTitle(lastSavedTitle);
    } finally {
      setSaving(false);
    }
  }, 500);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    saveTitle(e.target.value);
  };

  const enableInput = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      disableInput();
    }
    if (e.key === "Escape") {
      // Revert changes on escape
      setTitle(lastSavedTitle);
      disableInput();
    }
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  // Only update local state when navigating to a different page
  useEffect(() => {
    // Only update if we're not editing and the title actually changed
    if (!editing && initialTitle !== lastSavedTitle) {
      setTitle(initialTitle);
      setLastSavedTitle(initialTitle);
    }
  }, [initialTitle, editing, lastSavedTitle]);

  return (
    <div className="flex items-center gap-x-1">
      {editing ? (
        <Input
          className="h-7 px-2 focus:ring-0 focus-visible:ring-0 focus:outline-none"
          ref={inputRef}
          value={title}
          onChange={handleChange}
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
