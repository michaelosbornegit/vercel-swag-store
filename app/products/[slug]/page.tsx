import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProductDetails } from "@/components/product-details";
import {
  getFeaturedProducts,
  getProductBySlug,
  searchProducts,
} from "@/lib/server/products-dto";

import {
  StockSection,
  StockSectionSkeleton,
} from "./_components/stock-section";

export async function generateStaticParams() {
  const [featured, defaults] = await Promise.all([
    getFeaturedProducts(),
    searchProducts({}),
  ]);

  const slugs = new Set([
    ...featured.map((p) => p.slug),
    ...defaults.map((p) => p.slug),
  ]);

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.slice(0, 1),
      type: "website",
    },
  };
}

export default async function ProductDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <ProductDetails product={product}>
      <Suspense fallback={<StockSectionSkeleton />}>
        <StockSection
          product={{
            id: product.id,
            slug: product.slug,
            name: product.name,
            image: product.images[0] ?? "",
            priceCents: product.price,
          }}
        />
      </Suspense>
    </ProductDetails>
  );
}
