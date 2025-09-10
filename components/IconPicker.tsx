"use client";
import React from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface IconPickerProps {
  onChange: (emoji: string) => void;
  children?: React.ReactNode;
  asChild?: boolean;
}

function IconPicker({ onChange, children, asChild }: IconPickerProps) {
  const { resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme === "dark" ? Theme.DARK : Theme.LIGHT;
  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>
        <>{children}</>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
         <EmojiPicker
            height={350}
            theme={currentTheme}
            onEmojiClick={(emoji) => onChange(emoji.emoji)}
         />
      </PopoverContent>
    </Popover>
  );
}

export default IconPicker;
