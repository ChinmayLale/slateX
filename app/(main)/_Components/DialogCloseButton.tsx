"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addPageToCurrentDocument } from "@/services/document.service";
import { addPageToCurrentDocumentReducer } from "@/store/slices/documentSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface DialogCloseButtonProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}

export function DialogCloseButton({
  open,
  onOpenChange,
  id,
}: DialogCloseButtonProps) {
  const dispatch = useDispatch();
  const onAddClick = async () => {
    const data = addPageToCurrentDocument(id);

    toast.promise(data, {
      loading: "Adding Page...",
      success: "Page added successfully",
      error: "Failed to add page",
    });

    const page = await data;
    if (!page) {
      toast.error("Failed to add page");
      return;
    }
    dispatch(
      addPageToCurrentDocumentReducer({ documentId: id, page: page || {} })
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a page </DialogTitle>
          <DialogDescription>
            to this document or leave blank for Untitled
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue="Untitled Page" readOnly />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={onAddClick}>
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
