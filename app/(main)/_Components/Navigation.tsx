"use client";
import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import React, {
  useRef,
  ElementRef,
  useState,
  MouseEvent,
  useEffect,
} from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItems from "./UserItems";
import Item from "./Item";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  createNewDocument,
  getAllDocuments,
} from "@/services/document.service";
import { useDispatch } from "react-redux";
import { addDocument, setDocuments } from "@/store/slices/documentSlice";
import { get } from "http";
import { toast } from "sonner";

function Navigation() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isResizingref = useRef(false);
  const sideBarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const documents = useSelector(
    (state: RootState) => state.documents.documents
  );
  console.log({ documents });
  const [isReseting, setIsReseting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useState(() => {
    const getDocs = async () => {
      const documents = await getAllDocuments();
      dispatch(setDocuments(documents));
    };

    getDocs();
  }, []);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [isMobile, pathname]);

  const handleCreateDocument = async () => {
    try {
      const data = createNewDocument();
      toast.promise(data, {
        loading: "Creating New Document...",
        success: "Document created successfully",
        error: "Failed to create document",
      });
      // console.log("New Document:", data);
      const newDocument = await data;
      if (!newDocument) {
        toast.error("Failed to create document");
        return;
      }
      dispatch(addDocument(newDocument));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingref.current) {
      return;
    }
    let newWidth = event.clientX;
    if (newWidth < 240) {
      newWidth = 240;
    }
    if (newWidth > 480) {
      newWidth = 480;
    }

    if (sideBarRef.current && navbarRef.current) {
      sideBarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingref.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingref.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sideBarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsReseting(true);

      sideBarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0px" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => {
        setIsReseting(false);
      }, 300);
    }
  };

  const collapse = () => {
    if (sideBarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsReseting(true);

      sideBarRef.current.style.width = "0px";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => {
        setIsReseting(false);
      }, 300);
    }
  };

  return (
    <>
      <aside
        ref={sideBarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999] ",
          isReseting && " transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6 " />
        </div>
        <div>
          <UserItems />
        </div>
        <div className="mt-4 cursor-pointer">
          <Item
            label={"new page"}
            onClick={handleCreateDocument}
            icon={PlusCircle}
          />
        </div>
        <div className="mt-4">
          {documents.map((doc) => (
            <p key={doc.id} className="">
              {doc.title}
            </p>
          ))}
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0 "
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)] ",
          isReseting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              className="h-6 w-6 text-muted-foreground cursor-pointer"
              role="button"
            />
          )}
        </nav>
      </div>
    </>
  );
}

export default Navigation;
