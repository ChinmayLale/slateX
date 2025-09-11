"use client";
import Editor from "@/components/Editor";
import CoverImage from "@/components/CoverImage";
import ToolBar from "@/components/ToolBar";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store";
import { getPageByIds } from "@/store/selectors/documentSelectors";
import { useParams } from "next/navigation";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UpdatePageContentReducer } from "@/store/slices/documentSlice";
import { useDebounceCallback } from "usehooks-ts";
import { UpdateContentByPageIdService } from "@/services/document.service";

function DocumentIdPage() {
  const params = useParams();
  const { documentId, pageId } = params;
  const dispatch = useDispatch();
  const page =
    useSelector((state: RootState) =>
      getPageByIds(state, documentId as string, pageId as string)
    ) || null;

  // Option 2: Simpler approach (recommended)
  const handleContentChange = useDebounceCallback(
    (value: string) => {
      console.log("Saving content:", value.substring(0, 100) + "...");
      const res = UpdateContentByPageIdService(pageId as string, value);
      
      if (!!res) {
        dispatch(
          UpdatePageContentReducer({
            documentId: documentId as string,
            pageId: pageId as string,
            content: value,
          })
        );
      }
    },
    500,
    { leading: false, trailing: true } // Optional: configure debounce behavior
  );

  if (page === undefined) {
    return (
      <div>
        <CoverImage.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-14 w-[80%]" />
            <Skeleton className="h-14 w-[70%]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-40">
      <CoverImage url={page?.coverImage} previewMode={false} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <ToolBar page={page} previewMode={false} />
        <Editor
          onChange={handleContentChange} // Use the debounced function directly
          editable={true}
          initialContent={page?.content}
        />
      </div>
    </div>
  );
}

export default DocumentIdPage;
