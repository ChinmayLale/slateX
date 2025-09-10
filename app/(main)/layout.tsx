"use client";
import React from "react";
import Navigation from "./_Components/Navigation";
import { Provider } from "react-redux";
import { store } from "@/store";
import SearchCommand from "@/components/SearchCommand";
import ModalProvider from "@/components/providers/ModalProvider";
import { EdgeStoreProvider } from "../../lib/edgestore";
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div
        className="w-full h-full flex dark:bg-[#1f1f1f]"
        suppressContentEditableWarning
      >
        <Navigation />
        <main className="flex-1 h-full overflow-y-auto">
          <EdgeStoreProvider>
            <SearchCommand />
            <ModalProvider />
            {children}
          </EdgeStoreProvider>
        </main>
      </div>
    </Provider>
  );
}

export default RootLayout;
