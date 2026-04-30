import { Skeleton } from "@/components/ui/skeleton";
import { getActivePromotion } from "@/lib/server/promotions-dto";

export async function PromotionalBanner() {
  const promo = await getActivePromotion();
  if (!promo) return null;

  return (
    <div
      role="status"
      className="bg-foreground px-4 py-3 text-center text-sm text-background"
    >
      <span className="font-semibold">{promo.title}</span>
      <span className="mx-2 opacity-60">·</span>
      <span className="opacity-90">{promo.description}</span>
      <span className="mx-2 opacity-60">·</span>
      <span className="font-mono font-semibold tracking-wide">
        Code: {promo.code}
      </span>
    </div>
  );
}

export function PromotionalBannerSkeleton() {
  return <Skeleton className="h-11 w-full rounded-none" />;
}
