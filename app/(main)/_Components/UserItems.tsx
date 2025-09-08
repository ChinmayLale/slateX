"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronsLeftRight } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function UserItems() {
  const { user, isSignedIn } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5 "
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="s-5 rounded-md cursor-pointer">
              <AvatarImage
                src={user?.imageUrl || "https://github.com/shadcn.png"}
                className="s-5 rounded-sm"
              />
              <AvatarFallback className="s-5 rounded-full">
                {user?.firstName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.firstName}&apos;s slateX
            </span>
          </div>

          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground s-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 bg-secondary"
        align="start"
        alignOffset={11}
        //   forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium  leading-none text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center gap-x-2 ">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="s-8 ">
                <AvatarImage
                  src={user?.imageUrl || "https://github.com/shadcn.png"}
                  className="s-8 rounded-sm"
                />
                <AvatarFallback className="s-8 rounded-full">
                  {user?.firstName?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {user?.firstName}&apos;s slateX
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator>
          <DropdownMenuItem
            asChild
            className="w-full text-muted-foreground cursor-pointer"
          >
            <SignOutButton>Sign out</SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuSeparator>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserItems;
