import { FeaturedProducts } from "@/components/featured-products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex justify-center items-center flex-col">
      <p className="mb-2 font-bold text-3xl text-center">
        Welcome to the Vercel Swag Store
      </p>
      <p className="mb-4 text-lg">You want it. We have it. Now in black.</p>
      <Button asChild className="mb-4" variant="outline" size="lg">
        <Link href="/search" className="mb-4">
          Shop Now
        </Link>
      </Button>

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
