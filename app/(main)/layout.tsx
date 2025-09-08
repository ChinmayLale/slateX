"use client";
import React from "react";
import Navigation from "./_Components/Navigation";
import { Provider } from "react-redux";
import { store } from "@/store";
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div className="w-full h-full flex dark:bg-[#1f1f1f]">
        <Navigation />
        <main className="flex-1 h-full overflow-y-auto">{children}</main>
      </div>
    </Provider>
  );
}

export default RootLayout;
