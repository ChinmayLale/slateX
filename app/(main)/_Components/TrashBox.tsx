"use client";
import { Input } from "@/components/ui/input";
import {
  deletePermenently,
  getAllTrashDocuments,
  undoTrashDocumentById,
} from "@/services/document.service";
import { RootState } from "@/store";
import {
  deleteDocumentFromArchiveReducer,
  restoreDocumentFromArchiveReducer,
  setArchievedDocuments
} from "@/store/slices/documentSlice";
import { Search, Trash, Undo } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import ConfirmDelete from "./models/ConfirmDelete";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"

function TrashBox() {
  const [search, setSearch] = useState("");
  const { user } = useUser();
  const documents = useSelector(
    (state: RootState) => state.documents.trashDocuments
  );
  const dispatch = useDispatch();
  const router = useRouter();
  console.log({ documents: documents.length });
  const filteredDocuments = useMemo(() => {
    if (!search.trim()) return documents;
    return documents.filter((doc) =>
      doc.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, documents, dispatch]);

  useEffect(() => {
    const getAllDocs = async () => {
      if (user) {
        const documents = await getAllTrashDocuments(user.id);
        console.log("Documents got ");
        console.log({ documents });
        dispatch(setArchievedDocuments(documents));
      }
    };

    getAllDocs();
  }, []);

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
    } else {
      toast.error("Error Restoring Document");
    }
  };

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
    }
  };

  return (
    <div className="text-sm h-60 overflow-y-auto">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4 " />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Page title"
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
        />
      </div>

      <div className="mt-2 px-1 pb-1 overflow-y-auto">
        <p className="hidden last:block text-xs text-center text-muted-foreground">
          No Document Found
        </p>
        {filteredDocuments
          .filter((doc) => doc.isArchived === true)
          .map((doc) => (
            <div
              key={doc.id}
              role="button"
              onClick={() => {
                router.push(`/documents/${doc.id}/${doc.pages[0].id}`);
              }}
              className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between overflow-y-auto "
            >
              <span className="truncate pl-2 cursor-pointer">{doc.title}</span>
              <div className="flex items-center">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("restore document");
                    restoreDocument(doc.id);
                  }}
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Undo className="h-4 w-4 text-muted-foreground cursor-pointer" />
                </div>
                <ConfirmDelete onConfirm={() => handlePermenentDelete(doc.id)}>
                  <div
                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                    role="button"
                  >
                    <Trash className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </div>
                </ConfirmDelete>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TrashBox;
