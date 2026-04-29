import { Skeleton } from "@/components/ui/skeleton";
import { getProductStock } from "@/lib/server/products-dto";

import { AddToCart } from "./add-to-cart";

export async function StockSection({ productId }: { productId: string }) {
  const stock = await getProductStock(productId);
  return <AddToCart stock={stock} />;
}

export function StockSectionSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-24" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );
}
