"use client";

import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { toggleUpload } from "@/store/slices/misc.slice";
import { useEdgeStore } from "@/lib/edgestore";
import { UploaderProvider, UploadFn } from "./upload/uploader-provider";
import { SingleImageDropzone } from "./upload/single-image";
import { updateCoverImageForPageService } from "@/services/document.service";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { UpdateCoverImageForPageReducer } from "@/store/slices/documentSlice";

function GallaryUploadModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.misc.isUploadOpen);
  const params = useParams();
  const { documentId, pageId } = params;

  const replaceUrl = useSelector(
    (state: RootState) => state.misc.coverReplacedUrl
  );
  const handleOpenChange = () => {
    dispatch(toggleUpload(false));
  };

  const { edgestore } = useEdgeStore();
  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      let res = null;
      console.log({ replaceUrl });
      if (replaceUrl === null || replaceUrl === undefined) {
        res = await edgestore.publicFiles.upload({
          file,
          signal,
          onProgressChange,
        });
      } else {
        console.log("Entered in Else", replaceUrl);
        res = await edgestore.publicFiles.upload({
          file,
          options: {
            replaceTargetUrl: replaceUrl,
          },
          signal,
          onProgressChange,
        });
      }
      // you can run some server action or api here
      // to add the necessary data to your database
      console.log(res);
      if (res) {
        const { url } = res;
        const coverImageResponse = await updateCoverImageForPageService(
          documentId as string,
          pageId as string,
          url as string
        );

        if (coverImageResponse) {
          toast.success("Cover Image Updated");
          dispatch(
            UpdateCoverImageForPageReducer({
              documentId: documentId as string,
              pageId: pageId as string,
              coverImage: coverImageResponse as string,
            })
          );
          dispatch(toggleUpload(false));
        } else {
          toast.error("Something went wrong while uploading Image");
        }
      }
      return res;
    },
    [edgestore]
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <UploaderProvider uploadFn={uploadFn} autoUpload>
          <SingleImageDropzone
            height={200}
            width={200}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 2,
            }}
          />
        </UploaderProvider>
      </DialogContent>
    </Dialog>
  );
}

export default GallaryUploadModal;
