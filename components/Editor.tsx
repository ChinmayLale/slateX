"use client";

import React from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { PartialBlock } from "@blocknote/core";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
import { set } from "zod";
import CoverImage from "./CoverImage";
import { Skeleton } from "./ui/skeleton";

interface EditorProps {
  documentId?: string;
  pageId?: string;
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  data?:PartialBlock[];
}

function Editor({
  documentId,
  pageId,
  onChange,
  initialContent,
  editable = true,
  data,
}: EditorProps) {
  const { theme } = useTheme();
  const { edgestore } = useEdgeStore();
  const [loading, setLoading] = React.useState(false);
  // const [data, setData] = React.useState<PartialBlock[] | undefined>(undefined);
  const getInitialContent = async (): Promise<PartialBlock[] | undefined> => {
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



  const handleFileUpload = async (file: File): Promise<string> => {
    const upload = edgestore.publicFiles.upload({
      file,
    });
    toast.promise(upload, {
      loading: "Uploading file",
      success: "File uploaded",
      error: "Error uploading file",
    });

    return (await upload).url;
  };

  const editor = useCreateBlockNote({
    initialContent: data,
    uploadFile: handleFileUpload,
  });

  if (loading) {
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

  // Create the editor with initial content

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      theme={theme === "light" ? "light" : "dark"}
      onChange={() => {
        const blocks = editor.topLevelBlocks;
        onChange(JSON.stringify(blocks, null, 2));
      }}
    />
  );
}

export default Editor;
