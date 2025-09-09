"use client";
import ToolBar from "@/components/ToolBar";
import { RootState } from "@/store";
import { getPageByIds } from "@/store/selectors/documentSelectors";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function DocumentIdPage() {
  const params = useParams();
  const { documentId, pageId } = params;
  //   console.log({ documentId, pageId });
  const page =
    useSelector((state: RootState) =>
      getPageByIds(state, documentId as string, pageId as string)
    ) || null;

  return (
    <div className="pb-40 ">
      <div className="md:max-w-3xl lg:max-w-4xl max-auto ">
        <ToolBar page={page} />
      </div>
    </div>
  );
}

export default DocumentIdPage;
