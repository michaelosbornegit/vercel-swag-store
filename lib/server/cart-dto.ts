import "server-only";

import { type RawCart, type RawCartItem } from "./cart-api";

export type CartItemDTO = {
  id: string;
  slug: string;
  name: string;
  image: string;
  priceCents: number;
  quantity: number;
  lineTotalCents: number;
};

export type CartDTO = {
  token: string;
  items: CartItemDTO[];
  totalQuantity: number;
  subtotalCents: number;
  currency: string;
};

export function toCartDTO(raw: RawCart): CartDTO {
  return {
    token: raw.token,
    items: raw.items.map(toCartItemDTO),
    totalQuantity: raw.totalItems,
    subtotalCents: raw.subtotal,
    currency: raw.currency,
  };
}

function toCartItemDTO(raw: RawCartItem): CartItemDTO {
  return {
    id: raw.productId,
    slug: raw.product.slug ?? "",
    name: raw.product.name ?? "",
    image: raw.product.images?.[0] ?? "",
    priceCents: raw.product.price ?? 0,
    quantity: raw.quantity,
    lineTotalCents: raw.lineTotal,
  };
}
