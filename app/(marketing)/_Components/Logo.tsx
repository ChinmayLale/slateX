"use client";
import Image from "next/image";
import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
function Logo() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src={"logoDark.svg"}
        alt="logo"
        width={40}
        height={40}
        className={"hidden dark:block"}
      />
      <Image
        src={"logoLight.svg"}
        alt="logo"
        width={40}
        height={40}
        className={"block dark:hidden"}
      />
      <p className={cn("font-semibold ", font.className)}>SlatX</p>
    </div>
  );
}

export default Logo;
