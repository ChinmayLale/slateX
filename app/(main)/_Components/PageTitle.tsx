"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { updateTitleForPageService } from "@/services/document.service";
import { UpdatePageTitleInDocumentReducer } from "@/store/slices/documentSlice";
import { Page } from "@/types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDebounceCallback } from "usehooks-ts";

interface PageTitleProps {
  initialTitle: string;
  pageId: string;
  documentId: string;
}

function PageTitle({ initialTitle, documentId, pageId }: PageTitleProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialTitle);
  const [saving, setSaving] = useState(false);
  const [editing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const saveTitle = useDebounceCallback(async (newTitle: string) => {
    setSaving(true);
    try {
      const res = await updateTitleForPageService(documentId, pageId, newTitle);
      // console.log({ res });
      if (res) {
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
    setTitle(initialTitle);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const onkeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      disableInput();
    }
  };

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const disableInput = () => {
    setIsEditing(false);
  };
  return (
    <div className="flex items-center gap-x-1">
      {editing ? (
        <Input
          className="h-7 px-2 focus:ring-0 focus-visible:ring-0 focus:outline-none"
          ref={inputRef}
          value={title}
          onChange={handleChange}
          onKeyDown={onkeyDown}
          onBlur={disableInput}
          onClick={enableInput}
        />
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          variant="ghost"
          size="sm"
          className="font-medium h-auto p-1"
        >
          {title}
        </Button>
      )}
    </div>
  );
}

PageTitle.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-16 rounded-md bg-primary/5" />;
};

export default PageTitle;
