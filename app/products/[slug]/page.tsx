import { getFeaturedProducts, searchProducts } from "@/lib/server/products-dto";

export async function generateStaticParams() {
  const [featured, defaults] = await Promise.all([
    getFeaturedProducts(),
    searchProducts({}), // default state - returns 20 products which are displayed on the search page
  ]);

  const slugs = new Set([
    ...featured.map((p) => p.slug),
    ...defaults.map((p) => p.slug),
  ]);

  return Array.from(slugs).map((slug) => ({ slug }));
}

export default async function ProductDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  return <div>Product: {slug}</div>;
}
