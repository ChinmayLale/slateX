"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  // addPageToCurrentDocument,
  createNewDocument,
} from "@/services/document.service";
import {
  addDocument,
  // addPageToCurrentDocumentReducer,
} from "@/store/slices/documentSlice";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface DialogCloseButtonProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDocumentModel({
  open,
  onOpenChange,
}: DialogCloseButtonProps) {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState("Untitled Document");
  const {user} = useUser();
  const onAddClick = async () => {
    try {
      if(!user){
        console.log("User Not Found");
        return;
      }
      const data = createNewDocument(title , user.id);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a Docuemnt </DialogTitle>
          <DialogDescription>
            Enter name to this document or leave blank for Untitled
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="Untitled Page"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
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
