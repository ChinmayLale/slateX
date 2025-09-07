"use client";

import { Button } from "@/components/ui/button";
import React from "react";

function Header() {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        All your <span className="underline">notes</span>, tasks, and{" "}
        <span className="underline">plans</span> in one place — SlateX
      </h1>

      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        SlateX is your connected workspace where ideas, tasks, and collaboration
        come together seamlessly.
      </h3>

      <Button>Get Started 🚀</Button>
    </div>
  );
}

export default Header;
