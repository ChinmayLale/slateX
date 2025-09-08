"use client";

import { RootState } from "@/store";
import { Document } from "@/types";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface doumentListProps {
  parentId?: string;
  level?: number;
  data?: Document;
}
function DocumentList({ parentId, level = 0 }: doumentListProps) {
  const params = useParams();
  const router = useRouter();
  const documents = useSelector(
    (state: RootState) => state.documents.documents
  );
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const pages = documents.map((doc) => doc.pages);
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
      <p
        style={{ paddingLeft: level ? `${level * 12 + 12}px ` : "12px" }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80 ",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No Pages Inside
      </p>
      {documents.map((document) => {
        return (
          <div key={document.id}>
            <Item
              onClick={() => {}}
              id={document.id}
              label={document.title || "Untitled Document"}
              icon={FileIcon}
              documentIcon={""}
              active={params.documentId === document.id}
              level={level}
              onExpand={() => {}}
              expanded={expanded[document.id]}
            />

            {expanded[document.id] &&
              document.pages.map((page) => (
                <Item
                  key={page.id}
                  onClick={() => {}}
                  onExpand={() => onExpand(document.id)}
                  id={page.id}
                  label={page.title || "Untitled Page"}
                  icon={FileIcon} // Or a page icon
                  active={params.pageId === page.id}
                  level={level + 1}
                />
              ))}
          </div>
        );
      })}
    </>
  );
}

export default DocumentList;
