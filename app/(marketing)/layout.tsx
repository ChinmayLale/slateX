import React from "react";
import Navbar from "./_Components/Navbar";

function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full ">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
}

export default LandingPageLayout;
