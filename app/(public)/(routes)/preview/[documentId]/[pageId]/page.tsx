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
import {
  getAllDocuments,
  getPageByIdService,
} from "@/services/document.service";
import { useUser } from "@clerk/nextjs";
import { Page } from "@/types";
import { PartialBlock } from "@blocknote/core";

function DocumentIdPage() {
  const params = useParams();
  const { documentId, pageId } = params;
  const dispatch = useDispatch();
  const [page, setPage] = useState<Page | null>(null);
  const [pageData, setPageData] = useState<PartialBlock[] | undefined>(
    undefined
  );

  useEffect(() => {
    const getDocs = async () => {
      const page = await getPageByIdService(pageId as string);
      setPage(page);
    };

    getDocs();
  }, []);

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

  const getInitialContent = async (
    initialContent: string
  ): Promise<PartialBlock[] | undefined> => {
    if (initialContent) {
      console.log({ initialContent });
      try {
        console.log("Type Of Initial Content:", typeof initialContent);
        // Check if initialContent is already an object/array
        if (typeof initialContent === "object") {
          return initialContent as PartialBlock[];
        }

        // If it's a string, parse it
        const parsed = await JSON.parse(initialContent);

        console.log("Parsed Content");
        console.log({ parsed });
        // If the parsed result is still a string, parse again (double-stringified)
        if (typeof parsed === "string") {
          const d = (await JSON.parse(parsed)) as PartialBlock[];
          console.log("Parsed Content");
          console.log({ d });
          return d;
        }

        return parsed as PartialBlock[];
      } catch (error) {
        console.error("Error parsing initial content:", error);
        return undefined;
      }
    }
    return undefined;
  };

  useEffect(() => {
    const fetchContent = async () => {
      if (page && page.content) {
        const content = await getInitialContent(page.content);
        setPageData(content);
      }
    };

    fetchContent();
  }, [page]);

  if (page === null) {
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

  if (pageData === undefined) {
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
          initialContent={page.content}
          data={pageData}
        />
      </div>
    </div>
  );
}

export default DocumentIdPage;
