"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import ConfirmDelete from "./models/ConfirmDelete";
import {
  deletePermenently,
  undoTrashDocumentById,
} from "@/services/document.service";
import { toast } from "sonner";
import {
  deleteDocumentFromArchiveReducer,
  restoreDocumentFromArchiveReducer,
} from "@/store/slices/documentSlice";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { toggleDocumentDeleted } from "@/store/slices/misc.slice";

function Banner({ pageId }: { pageId: string }) {
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();
  const documentId = params.documentId as string;

  const handlePermenentDelete = async (id: string) => {
    const res = deletePermenently(id);
    toast.promise(res, {
      loading: "Deleting Document",
      success: "Document Deleted",
      error: "Error Deleting Document",
    });
    const result = await res;
    if (!result) {
      toast.error("Error Deleting Document");
      return;
    }
    if (result) {
      dispatch(deleteDocumentFromArchiveReducer(id));
      router.push(`/documents`);
    }
  };

  const restoreDocument = async (id: string) => {
    console.log("restoring doc");
    const res = undoTrashDocumentById(id);
    toast.promise(res, {
      loading: "Restoring Document",
      success: "Document Restored",
      error: "Error Restoring Document",
    });
    const result = await res;
    if (result) {
      dispatch(restoreDocumentFromArchiveReducer(id));
      window.location.reload();
    } else {
      toast.error("Error Restoring Document");
    }
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in Trash</p>
      <Button
        size={"sm"}
        variant={"outline"}
        onClick={() => {
          restoreDocument(documentId);
          console.log("Restore Clicked");
        }}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore Document
      </Button>
      <ConfirmDelete
        onConfirm={() => {
          handlePermenentDelete(documentId);
          console.log("Confirm Delete Clicked");
        }}
      >
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => {
            console.log("Restore Clicked");
          }}
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete Forever
        </Button>
      </ConfirmDelete>
    </div>
  );
}

export default Banner;
