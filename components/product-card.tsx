import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";

export type ProductSummaryDTO = {
  id: string;
  slug: string;
  images: string[];
  name: string;
  price: number;
};

export function ProductCard({ product }: { product: ProductSummaryDTO }) {
  const [primaryImage] = product.images;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <Card className="overflow-hidden p-0 transition-shadow hover:shadow-md">
        <CardHeader className="p-0">
          <div className="relative aspect-square bg-muted">
            {primaryImage && (
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-1 p-4">
          <h3 className="font-medium leading-tight text-center">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground text-center">
            {product.price}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
