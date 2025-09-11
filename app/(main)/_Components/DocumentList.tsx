"use client";

import { RootState } from "@/store";
import { Document } from "@/types";
import { useParams, useRouter } from "next/navigation";
import React  from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
// import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
// import { DialogCloseButton } from "./DialogCloseButton";

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
  // const [open, setOpen] = React.useState(false);
  console.log({DocumentList:parentId})
  const onExpand = (id: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  const onAddPage = (documentId: string) => {
    // Handle adding a new page to the document
    console.log("Adding page to document:", documentId);
    // setOpen(true);
    // You can dispatch an action or call an API here
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
      {documents
        .filter((document) => document.isArchived === false)
        .map((document) => {
          return (
            <div key={document.id}>
              {/* Document Item - shows add button */}
              <Item
                onClick={() => {
                  // router.push(`/documents/${document.pages[0].id}`);
                }}
                id={document.id}
                label={document.title || "Untitled Document"}
                icon={FileIcon}
                documentIcon={""}
                active={params.documentId === document.id}
                level={level}
                onExpand={() => onExpand(document.id)}
                expanded={expanded[document.id]}
                showAddButton={true} // Show add button for documents
                onAdd={() => onAddPage(document.id)} // Handle add page
              />

              {expanded[document.id] && (
                <>
                  {document.pages &&
                  !document.isArchived &&
                  document.pages.length > 0 ? (
                    document.pages.map((page) => (
                      <Item
                        key={page.id}
                        onClick={() => {
                          router.push(`/documents/${document.id}/${page.id}`);
                        }}
                        id={page.id}
                        label={page.title || "Untitled Page"}
                        icon={FileIcon}
                        active={params.pageId === page.id}
                        level={level + 3}
                        // No showAddButton prop = defaults to false, no add button for pages
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
