"use client";

import { Button } from "@/components/ui/button";
import { createNewDocument } from "@/services/document.service";
import { addDocument } from "@/store/slices/documentSlice";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function DocumentPage() {
  const { isSignedIn, user  } = useUser();
  const dispatch = useDispatch();

  const handleCreateDocument = async () => {
    try {
      const data =  createNewDocument("New Document", user? user.id : "");
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

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/CreateD.svg"
        alt="Empty"
        width={300}
        height={300}
        className="dark:hidden"
      />
      <Image
        src="/CreateL.svg"
        alt="Empty"
        width={300}
        height={300}
        className="dark:block hidden"
      />

      <h2 className="text-lg font-medium ">
        Welcome to {isSignedIn && user?.firstName}&apos;s slateX Workspace
      </h2>

      <Button onClick={handleCreateDocument}>
        <PlusCircle className="s-4 mr-2" />
        Create a Document
      </Button>
    </div>
  );
}

export default DocumentPage;
