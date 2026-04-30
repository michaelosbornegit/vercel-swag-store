import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product-card";
import { getCategories } from "@/lib/server/categories-dto";
import { searchProducts } from "@/lib/server/products-dto";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await props.params;
  const categories = await getCategories();
  const matched = categories.find((c) => c.slug === category);
  if (!matched) return { title: "Category not found" };

  const description = `Shop ${matched.name.toLowerCase()} from the Vercel Swag Store.`;
  return {
    title: matched.name,
    description,
    openGraph: {
      title: matched.name,
      description,
      type: "website",
    },
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await props.params;

  const [categories, products] = await Promise.all([
    getCategories(),
    searchProducts({ category }),
  ]);

  const matched = categories.find((c) => c.slug === category);
  if (!matched) notFound();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">
          Category
        </p>
        <h1 className="text-3xl font-bold">{matched.name}</h1>
      </header>

      {products.length === 0 ? (
        <p className="rounded-lg border bg-muted/30 p-8 text-center text-muted-foreground">
          No products in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
