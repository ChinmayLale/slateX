"use client";

import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { toggleSearch } from "@/store/slices/misc.slice";
import { File } from "lucide-react";

function SearchCommand() {
  const documents = useSelector(
    (state: RootState) => state.documents.documents
  );
  const router = useRouter();
  const isOpen = useSelector((state: RootState) => state.misc.isSearchOpen);
  const dispath = useDispatch();
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      dispath(toggleSearch(false));
    }

    const down = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        dispath(toggleSearch(true));
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen]);

  const closeDialog = () => {
    dispath(toggleSearch(false));
  };

  const onSelect = (id: string) => {
    dispath(toggleSearch(false));
    router.push(`/document/${id}`);
  };

  if (!mounted) {
    return <div></div>;
  }
  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={closeDialog}
      className="z-[99999] backdrop-blur-md"
    >
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents.map((doc) => (
            <CommandItem
              key={doc.id}
              value={`${doc.id}-${doc.title}`}
              title={doc.title || "Untitled Document"}
              onSelect={() => {
                onSelect(doc.pages[0].id);
              }}
            >
              <File className="mr-2 h-4 w-4" />
              <span>{doc.title || "Untitled Document"}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export default SearchCommand;
