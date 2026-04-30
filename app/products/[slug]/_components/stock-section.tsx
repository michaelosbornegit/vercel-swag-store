import { type CartItemInfo } from "@/components/cart/cart-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductStock } from "@/lib/server/products-dto";

import { AddToCart } from "./add-to-cart";

export async function StockSection({ product }: { product: CartItemInfo }) {
  const stock = await getProductStock(product.id);
  return <AddToCart product={product} stock={stock} />;
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
