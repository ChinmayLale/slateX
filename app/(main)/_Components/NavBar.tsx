"use client";

import { MenuIcon } from "lucide-react";
import React from "react";
import PageTitle from "./PageTitle";
import { useSelector } from "react-redux";
import { getPageByIds } from "@/store/selectors/documentSelectors";
import { RootState } from "@/store";
import { useParams } from "next/navigation";
import Banner from "./Banner";
import Publish from "./Publish";

interface NavBarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
  //   documentId: string;
  //   pageId: string;
}
function NavBar({
  isCollapsed,
  onResetWidth,
}: //   documentId,
//   pageId,
NavBarProps) {
  // Add Code here to getPage By Doc Id

  // const [isRestored, setIsRestored] = React.useState(false);
  const params = useParams();
  const { documentId, pageId } = params;
  //   console.log({ documentId, pageId });
  const page = useSelector((state: RootState) =>
    getPageByIds(state, documentId as string, pageId as string)
  );

  console.log("Page archived status:", page?.isArchived);
  console.log("Full page object:", page);

  if (page?.title === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        <PageTitle.Skeleton />
      </nav>
    );
  }
  return (
    <>
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            className="h-6 w-6 text-muted-foreground"
            role="button"
            onClick={onResetWidth}
          />
        )}

        <div className="flex items-center justify-between w-full">
          <PageTitle
            initialTitle={page?.title || "Untitled Page this is"}
            documentId={documentId as string}
            pageId={pageId as string}
          />

          <Publish intialData = { page}/>
        </div>
      </nav>

      {page.isArchived && <Banner pageId={pageId as string} />}
    </>
  );
}
export default NavBar;
