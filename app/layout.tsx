import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Vercel Swag Store",
    default: "Vercel Swag Store",
  },
  description: "You want it. We have it. Now in black.",
  openGraph: {
    type: "website",
    siteName: "Vercel Swag Store",
    title: "Vercel Swag Store",
    description: "You want it. We have it. Now in black.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vercel Swag Store",
    description: "You want it. We have it. Now in black.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <header className="mb-8 border-b py-4">
          <nav className="mx-auto flex max-w-6xl gap-4 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="font-semibold">
              Home
            </Link>
            <Link href="/search" className="text-gray-600 hover:text-gray-900">
              Search
            </Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="border-t mt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500 text-sm">
            © 2026 Vercel Swag Store
          </div>
        </footer>
      </body>
    </html>
  );
}
