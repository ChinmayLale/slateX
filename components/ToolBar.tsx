"use client";
import { Page } from "@/types";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import IconPicker from "./IconPicker";
import { Button } from "./ui/button";
import { Image, Smile, X } from "lucide-react";
import TextAreaAutoSize from "react-textarea-autosize";
import { useDispatch } from "react-redux";
import { useDebounceCallback } from "usehooks-ts";
import { updateTitleForPageService } from "@/services/document.service";
import {
  UpdateIconForCurrentPageReducer,
  UpdatePageTitleInDocumentReducer,
} from "@/store/slices/documentSlice";
import { useParams } from "next/navigation";
import {
  useTitleEditor,
  useTitleEditorForTextarea,
} from "@/hooks/useTitleEditor";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleUpload } from "@/store/slices/misc.slice";

interface ToolBarProps {
  page: Page | null;
  previewMode?: boolean;
}

function ToolBar({ page, previewMode }: ToolBarProps) {
  const {
    inputRef,
    title,
    isEditing,
    saving,
    enableInput,
    disableInput,
    onInputChange,
    onKeyDown,
  } = useTitleEditorForTextarea({
    initialTitle: page?.title || "Untitled Page",
    onSaveSuccess: (newTitle) => {
      console.log("Title saved successfully:", newTitle);
    },
    onSaveError: (error) => {
      console.error("Failed to save title:", error);
    },
  });

  const dispatch = useDispatch();
  const params = useParams();
  const { documentId, pageId } = params;
  const isUploadOpen = useSelector(
    (state: RootState) => state.misc.isUploadOpen
  );

  const handleOpenChange = () => {
    dispatch(toggleUpload(true));
  };

  const onSelectIcon = (icon: string) => {
    console.log({ icon });
    if (page) {
      dispatch(
        UpdateIconForCurrentPageReducer({
          documentId: documentId as string,
          pageId: pageId as string,
          icon,
        })
      );
    }
  };

  const onRemoveIcon = () => {
    if (page) {
      dispatch(
        UpdateIconForCurrentPageReducer({
          documentId: documentId as string,
          pageId: pageId as string,
          icon: "",
        })
      );
    }
  };

  return (
    <div className="pl-[54px] group relative">
      {!!page?.icon && !previewMode && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={() => {}}>
            <p className="text-6xl hover:opacity-75 transition cursor-pointer">
              {page.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs cursor-pointer"
            variant={"outline"}
            size={"icon"}
          >
            <X className="h-4 w-4 " />
          </Button>
        </div>
      )}
      {!!page?.icon && previewMode && (
        <p className="text-6xl pt-6">{page.icon}</p>
      )}

      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!page?.icon && !previewMode && (
          <IconPicker onChange={onSelectIcon}>
            <Button
              className="text-muted-foreground text-xs "
              variant={"outline"}
              size={"sm"}
            >
              <Smile className="mr-2 h-4 w-4" />
              Add Icon
            </Button>
          </IconPicker>
        )}

        {!page?.coverImage && !previewMode && (
          <Button
            className="text-muted-foreground text-xs "
            variant={"outline"}
            size={"sm"}
            onClick={handleOpenChange}
          >
            <Image className="mr-2 h-4 w-4" />
            Add Cover
          </Button>
        )}
      </div>

      {isEditing && !previewMode ? (
        <TextAreaAutoSize
          ref={inputRef}
          onBlur={disableInput}
          value={title}
          onChange={(e) => onInputChange(e)}
          onKeyDown={onKeyDown}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] cursor-pointer"
        >
          {page?.title || "Untitled Page"}
        </div>
      )}
    </div>
  );
}

export default ToolBar;
