"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

function DocumentPage() {
  const { isSignedIn, user } = useUser();
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

      <Button>
        <PlusCircle className="s-4 mr-2" />
        Create a Document
      </Button>
    </div>
  );
}

export default DocumentPage;
