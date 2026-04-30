import { Suspense } from "react";
import Link from "next/link";

import { FeaturedProducts } from "@/components/featured-products";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col items-center text-center">
        <p className="mb-2 font-bold text-3xl">
          Welcome to the Vercel Swag Store
        </p>
        <p className="mb-4 text-lg">You want it. We have it. Now in black.</p>
        <Button asChild className="mb-4" variant="outline" size="lg">
          <Link href="/search">Shop Now</Link>
        </Button>
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
