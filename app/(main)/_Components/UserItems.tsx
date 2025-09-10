"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronsLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function UserItems() {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5 rounded-md transition"
        >
          <div className="gap-x-2 flex items-center max-w-[150px] overflow-hidden">
            <Avatar className="h-6 w-6 rounded-md cursor-pointer">
              <AvatarImage
                src={user?.imageUrl || "https://github.com/shadcn.png"}
                className="h-6 w-6 rounded-sm"
              />
              <AvatarFallback className="h-6 w-6 rounded-full">
                {user?.firstName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.firstName}&apos;s slateX
            </span>
          </div>

          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 bg-secondary border border-border rounded-lg shadow-md p-2"
        align="start"
        alignOffset={11}
      >
        <div className="flex flex-col space-y-3 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.emailAddresses[0]?.emailAddress}
          </p>

          <div className="flex items-center gap-x-3">
            <Avatar className="h-10 w-10 rounded-md">
              <AvatarImage
                src={user?.imageUrl || "https://github.com/shadcn.png"}
                className="h-10 w-10 rounded-sm"
              />
              <AvatarFallback className="h-10 w-10 rounded-full">
                {user?.firstName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">
                {user?.firstName}&apos;s slateX
              </p>
              <p className="text-xs text-muted-foreground">
                Personal Workspace
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="w-full cursor-pointer text-sm text-red-600 hover:text-red-700 hover:bg-red-100"
          asChild
        >
          <SignOutButton>Sign out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserItems;
