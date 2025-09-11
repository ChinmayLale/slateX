("");
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
  title: {
    default: "SlateX - Modern Notion-like Workspace",
    template: "%s | SlateX",
  },
  description:
    "SlateX is a sleek, modern Notion-like workspace built with Next.js 13 for effortless note-taking, task management, and collaboration. Create, organize, and share your ideas seamlessly.",
  keywords: [
    "notion alternative",
    "workspace",
    "note-taking",
    "task management",
    "collaboration",
    "productivity",
    "nextjs",
    "markdown editor",
    "document management",
    "team workspace",
  ],
  authors: [
    {
      name: "Chinmay Kalyan Lale",
      url: "https://github.com/ChinmayLale",
    },
  ],
  creator: "Chinmay Kalyan Lale",
  publisher: "SlateX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://slate-x.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://slate-x.vercel.app",
    title: "SlateX - Modern Notion-like Workspace",
    description:
      "SlateX is a sleek, modern Notion-like workspace built with Next.js 13 for effortless note-taking, task management, and collaboration. Create, organize, and share your ideas seamlessly.",
    siteName: "SlateX",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SlateX - Modern Notion-like Workspace",
        type: "image/png",
      },
      {
        url: "/file.svg",
        width: 1200,
        height: 1200,
        alt: "SlateX Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SlateX - Modern Notion-like Workspace",
    description:
      "Effortless note-taking, task management, and collaboration in a sleek, modern workspace.",
    creator: "@YourTwitterHandle", // Replace with your actual Twitter handle
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 600,
        alt: "SlateX - Modern Notion-like Workspace",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        href: "/logoDark.svg",
        url: "/logoDark.svg",
        type: "image/svg+xml",
      },
      {
        media: "(prefers-color-scheme: light)",
        href: "/logoLight.svg",
        url: "/logoLight.svg",
        type: "image/svg+xml",
      },
      {
        url: "/logoDark.svg",
        sizes: "16x16 32x32",
        type: "image/x-icon",
      },
    ],
    shortcut: "/logoLight.svg",
    apple: [
      {
        url: "/logoDark.svg",
        sizes: "180x180",
        type: "image/x-icon",
      },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/favicon.ico",
      },
    ],
  },
  manifest: "/site.webmanifest",
  applicationName: "SlateX",
  referrer: "origin-when-cross-origin",
  category: "productivity",
  classification: "Productivity Tool",
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  appleWebApp: {
    capable: true,
    title: "SlateX",
    statusBarStyle: "default",
  },
  other: {
    "msapplication-TileColor": "#2d3748",
    "theme-color": "#ffffff",
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
