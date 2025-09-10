"use client";
import Editor from "@/components/Editor";
import CoverImage from "@/components/CoverImage";
import ToolBar from "@/components/ToolBar";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store";
import { getPageByIds } from "@/store/selectors/documentSelectors";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UpdatePageContentReducer } from "@/store/slices/documentSlice";

function DocumentIdPage() {
  const params = useParams();
  const { documentId, pageId } = params;
  const dispatch = useDispatch();
  const page =
    useSelector((state: RootState) =>
      getPageByIds(state, documentId as string, pageId as string)
    ) || null;

  const onChangeContent = (value: string) => {
    console.log(value);
    dispatch(
      UpdatePageContentReducer({
        documentId: documentId as string,
        pageId: pageId as string,
        content: value,
      })
    );
  };

  if (page === undefined) {
    return (
      <div>
        <CoverImage.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4 ">
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-14 w-[80%]" />
            <Skeleton className="h-14 w-[70%]" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="pb-40 ">
      <CoverImage url={page?.coverImage} previewMode={false} />
      <div className="md:max-w-3xl lg:max-w-4xl max-auto">
        <ToolBar page={page} previewMode={false} />
        <Editor
          onChange={onChangeContent}
          editable={true}
          initialContent={page?.content}
        />
      </div>
    </div>
  );
}

export default DocumentIdPage;
