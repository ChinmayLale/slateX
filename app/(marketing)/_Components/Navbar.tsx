"use client";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./Logo";
import { ModeToggle } from "@/components/ModeToggle";
import UserMenu from "./UserMenu";

function Navbar() {
  const scrolled = useScrollTop({ threshold: 60 });
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1E1E1E] fixed top-0 flex items-center w-full p-6",
        scrolled && "shadow-sm border-b"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <UserMenu />
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
