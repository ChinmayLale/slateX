"use client";

import { SignOutButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner"; // your spinner component
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  if (!isLoaded) return <Spinner />;

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-x-2">
        <Button variant="secondary" onClick={() => router.push("/sign-in")}>
          Sign in
        </Button>
        <Button onClick={() => router.push("/sign-up")}>Get slatX free</Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 rounded-md cursor-pointer">
          <AvatarImage
            src={user?.imageUrl || "https://github.com/shadcn.png"}
            className="w-8 h-8 rounded-sm"
          />
          <AvatarFallback className="w-8 h-8 rounded-full">
            {user?.firstName?.[0] || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => (window.location.href = "/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => (window.location.href = "/settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignOutButton>
            <button className="w-full text-left">Logout</button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
