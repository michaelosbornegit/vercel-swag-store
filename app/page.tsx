import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { FeaturedProducts } from "@/components/featured-products";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  description:
    "Premium swag for developers. Shop t-shirts, hoodies, bottles, hats, and more — all in black.",
  openGraph: {
    title: "Vercel Swag Store",
    description:
      "Premium swag for developers. Shop t-shirts, hoodies, bottles, hats, and more — all in black.",
    type: "website",
  },
  twitter: {
    title: "Vercel Swag Store",
    description:
      "Premium swag for developers. Shop t-shirts, hoodies, bottles, hats, and more — all in black.",
  },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="grid min-h-[20rem] items-center gap-8 md:grid-cols-2">
        <div className="space-y-5 text-center md:text-left">
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Welcome to the Vercel Swag Store
          </h1>
          <p className="text-lg text-muted-foreground">
            You want it. We have it. Now in black.
          </p>
          <Button asChild size="lg">
            <Link href="/search">Shop Now</Link>
          </Button>
        </div>

        <div className="flex justify-center md:justify-end">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 90"
            className="h-56 w-auto text-foreground md:h-72 lg:h-80"
            fill="currentColor"
          >
            <path d="M50 0L100 90H0L50 0Z" />
          </svg>
        </div>
      </section>

      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">
            Loading featured products…
          </p>
        }
      >
        <FeaturedProducts />
      </Suspense>
    </div>
  );
}
