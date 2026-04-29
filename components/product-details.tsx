import Image from "next/image";

import { ProductSummaryDTO } from "./product-card";

export type ProductDetailsDTO = ProductSummaryDTO & {
  description: string;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ProductDetails({
  product,
  children,
}: {
  product: ProductDetailsDTO;
  children: React.ReactNode;
}) {
  const [primaryImage] = product.images;

  return (
    <article className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        {primaryImage && (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>
          <p className="text-2xl">
            {priceFormatter.format(product.price / 100)}
          </p>
        </header>
        <p className="leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        {children}
      </div>
    </article>
  );
}
