"use client";

import { Page } from "@/types";
import React from "react";
// import useOrigin from "@/hooks/useOrigin";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
// import { init } from "next/dist/compiled/webpack/webpack";
import { Check, Copy, Globe } from "lucide-react";
import { publishAPageService } from "@/services/document.service";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { PublishPagebyIdReducer } from "@/store/slices/documentSlice";
import { useParams } from "next/navigation";
// import { string } from "zod";

interface Props {
  intialData: Page;
}

function Publish({ intialData }: Props) {
  const [copied, setCopied] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const { documentId, pageId } = params;
  const url = `${origin}/preview/${documentId}/${pageId}`;
  const onPublish = async () => {
    setIsSubmitting(true); // Start loading

    try {
      const res = publishAPageService(intialData.id);

      toast.promise(res, {
        loading: "Publishing Page",
        success: "Page Published",
        error: "Error Publishing Page",
      });

      const isPublished = await res;

      if (isPublished && documentId && pageId) {
        dispatch(
          PublishPagebyIdReducer({
            documentId: documentId as string,
            pageId: pageId as string,
          })
        );
      }
    } catch (error) {
      console.error("Error publishing page:", error);
    } finally {
      setIsSubmitting(false); // Reset loading no matter what
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          Publish
          {intialData.isPublished && (
            <Globe className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 " align="end" alignOffset={8} forceMount>
        {intialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2 text-muted-foreground">
              <Globe className="text-sky-500 w-4 h-4 animate-pulse" />
              <p className="text-sm text-sky-500 font-medium">
                This note is live on web
              </p>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={url}
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" onClick={onCopy} />
                )}
              </Button>
            </div>
            <Button
              size={"sm"}
              className="w-full text-xs "
              disabled={isSubmitting}
              onClick={onPublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="text-muted-foreground w-8 h-8 mb-2" />
            <p className="text-sm font-medium mb-2">Publish This Page</p>

            <span className="text-muted-foreground text-xs mb-4">
              Share Your Work With Others
            </span>

            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs"
              size={"sm"}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Publish;
