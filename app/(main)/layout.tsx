import React from "react";
import Navigation from "./_Components/Navigation";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex dark:bg-[#1f1f1f]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
}

export default RootLayout;
