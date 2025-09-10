"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  setCoverReplacedUrlReducder,
  toggleUpload,
} from "@/store/slices/misc.slice";
import { updateCoverImageForPageService } from "@/services/document.service";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { UpdateCoverImageForPageReducer } from "@/store/slices/documentSlice";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";
interface CoverImageProps {
  url?: string | undefined;
  previewMode?: boolean;
}
function CoverImage({ url, previewMode }: CoverImageProps) {
  const dispatch = useDispatch();
  const handleChangeClick = () => {
    dispatch(setCoverReplacedUrlReducder(url || ""));
  };
  const params = useParams();
  const { documentId, pageId } = params;
  const { edgestore } = useEdgeStore();
  const handleDeleteCoverImage = async () => {
    const rmv = edgestore.publicFiles.delete({
      url: url as string,
    });

    toast.promise(rmv, {
      loading: "Removing Cover Image",
      success: "Cover Image Removed",
      error: "Error Removing Cover Image",
    });
    const coverImageResponse = await updateCoverImageForPageService(
      documentId as string,
      pageId as string
    );

    if (coverImageResponse !== undefined) {
      toast.success("Cover Image Updated");
      dispatch(
        UpdateCoverImageForPageReducer({
          documentId: documentId as string,
          pageId: pageId as string,
          coverImage: "",
        })
      );
      dispatch(toggleUpload(false));
    }
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && (
        <Image
          src={url}
          alt="Cover Image"
          fill
          className="object-cover object-center"
        />
      )}

      {url && !previewMode && (
        <div className=" opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={handleChangeClick}
            className="text-primary-foreground text-xs "
            variant={"default"}
            size={"sm"}
          >
            <ImageIcon className="mr-2 h-4 w-4 " />
            Change Cover
          </Button>
          <Button
            onClick={handleDeleteCoverImage}
            className="text-primary-foreground text-xs "
            variant={"default"}
            size={"sm"}
          >
            <X className="mr-2 h-4 w-4 " />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}

CoverImage.Skeleton = function CoverImageSkeleton() {
  return <Skeleton className="h-[35vh] bg-primary/5 w-full" />;
};

export default CoverImage;
