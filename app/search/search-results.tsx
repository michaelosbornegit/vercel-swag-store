import { ProductCard } from "@/components/product-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProductSummaryDTO } from "@/components/product-card";
import { searchProducts } from "@/lib/server/products-dto";

export async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const products = await searchProducts({ query });
  return <ProductsGrid products={products} />;
}

export function ProductsGrid({ products }: { products: ProductSummaryDTO[] }) {
  if (products.length === 0) {
    return (
      <p
        className="rounded-lg border bg-muted/30 p-8 text-center
  text-muted-foreground"
      >
        No products match your search. Try a different query.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card key={i} className="overflow-hidden p-0">
          <CardHeader className="p-0">
            <Skeleton className="aspect-square w-full rounded-none" />
          </CardHeader>
          <CardContent className="space-y-2 p-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
