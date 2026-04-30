import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

import {
  PromotionalBanner,
  PromotionalBannerSkeleton,
} from "@/app/_components/promotional-banner";
import { CartButton } from "@/components/cart/cart-button";
import { CartProvider } from "@/components/cart/cart-provider";
import { NavLink } from "@/components/nav-link";

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
        <CartProvider>
          <header className="border-b py-4">
            <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 sm:px-6 lg:px-8">
              <Link
                href="/"
                aria-label="Vercel Swag Store — Home"
                className="flex items-center gap-2 font-semibold"
              >
                <span aria-hidden="true">▲</span>
                <span>Swag Store</span>
              </Link>
              <div className="ml-auto flex items-center gap-6">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/search">Search</NavLink>
                <CartButton />
              </div>
            </nav>
          </header>
          <Suspense fallback={<PromotionalBannerSkeleton />}>
            <PromotionalBanner />
          </Suspense>
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8 mt-8">
            {children}
          </main>
          <footer className="border-t mt-8">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500 text-sm">
              © 2026 Vercel Swag Store
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
