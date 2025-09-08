"use client";

import { RootState } from "@/store";
import { Document } from "@/types";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
  parentId?: string;
  level?: number;
  data?: Document;
}

function DocumentList({ parentId, level = 0 }: DocumentListProps) {
  const params = useParams();
  const router = useRouter();
  const documents = useSelector(
    (state: RootState) => state.documents.documents
  );
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const onExpand = (id: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      {documents.map((document) => {
        return (
          <div key={document.id}>
            <Item
              onClick={() => {
                // Navigate to document or handle document click
                router.push(`/documents/${document.id}`);
              }}
              id={document.id}
              label={document.title || "Untitled Document"}
              icon={FileIcon}
              documentIcon={""}
              active={params.documentId === document.id}
              level={level}
              onExpand={() => onExpand(document.id)}
              expanded={expanded[document.id]}
            />

            {expanded[document.id] && (
              <>
                {document.pages && document.pages.length > 0 ? (
                  document.pages.map((page, index) => (
                    <Item
                      key={page.id}
                      onClick={() => {
                        // Navigate to page
                        router.push(
                          `/documents/${document.id}/pages/${page.id}`
                        );
                      }}
                      id={page.id}
                      label={page.title || `Page ${index + 1}`}
                      icon={FileIcon}
                      active={params.pageId === page.id}
                      level={level + 2}
                    />
                  ))
                ) : (
                  <p
                    style={{ paddingLeft: `${(level + 1) * 12 + 12}px` }}
                    className="text-sm font-medium text-muted-foreground/80 py-1"
                  >
                    No Pages Inside
                  </p>
                )}
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export default DocumentList;
