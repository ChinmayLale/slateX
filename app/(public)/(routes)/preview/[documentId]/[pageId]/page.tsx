"use client";
import Editor from "@/components/Editor";
import CoverImage from "@/components/CoverImage";
import ToolBar from "@/components/ToolBar";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store";
import { getPageByIds } from "@/store/selectors/documentSelectors";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setDocuments,
  UpdatePageContentReducer,
} from "@/store/slices/documentSlice";
import { getAllDocuments } from "@/services/document.service";

function DocumentIdPage() {
  const params = useParams();
  const { documentId, pageId } = params;
  const dispatch = useDispatch();

  useEffect(() => {
    const getDocs = async () => {
      const documents = await getAllDocuments();
      dispatch(setDocuments(documents));
    };

    getDocs();
  }, []);

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
      <CoverImage url={page?.coverImage} previewMode={true} />
      <div className="md:max-w-3xl lg:max-w-4xl max-auto">
        <ToolBar page={page} previewMode={true} />
        <Editor
          onChange={onChangeContent}
          editable={false}
          initialContent={page?.content}
        />
      </div>
    </div>
  );
}

export default DocumentIdPage;
