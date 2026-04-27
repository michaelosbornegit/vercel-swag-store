import { getFeaturedProducts } from "@/lib/server/products-dto";

export async function generateStaticParams() {
  const featured = await getFeaturedProducts();
  return featured.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  return <div>Product: {slug}</div>;
}
