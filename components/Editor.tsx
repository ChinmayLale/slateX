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

interface EditorProps {
  documentId?: string;
  pageId?: string;
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

function Editor({
  documentId,
  pageId,
  onChange,
  initialContent,
  editable = true,
}: EditorProps) {
  const { theme } = useTheme();
  const { edgestore } = useEdgeStore();
  const getInitialContent = (): PartialBlock[] | undefined => {
    if (initialContent) {
      try {
        return JSON.parse(initialContent) as PartialBlock[];
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
  // Create the editor with initial content
  const editor = useCreateBlockNote({
    initialContent: getInitialContent(),
    uploadFile: handleFileUpload,
  });

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
