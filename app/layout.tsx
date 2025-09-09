import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@/components/clerk-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SlateX",
  description:
    "SlateX is a sleek, modern Notion-like workspace built with Next.js 13 for effortless note-taking, task management, and collaboration.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        href: "/logoDark.svg",
        url: "/logoDark.svg",
      },
      {
        media: "(prefers-color-scheme: light)",
        href: "/logoLight.svg",
        url: "/logoLight.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressContentEditableWarning={true}
        >
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
            storageKey="slatX-key"
          >
            <Toaster position="top-right" />
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
