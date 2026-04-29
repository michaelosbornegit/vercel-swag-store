import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/server/products-dto";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Featured</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
