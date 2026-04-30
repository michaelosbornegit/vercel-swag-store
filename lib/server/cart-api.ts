import "server-only";

import { authenticatedFetch } from "../api";
import { type RawProduct } from "./products-api";

export type RawCartItem = {
  productId: string;
  quantity: number;
  addedAt: string;
  product: RawProduct;
  lineTotal: number;
};

export type RawCart = {
  token: string;
  items: RawCartItem[];
  totalItems: number;
  subtotal: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
};

export async function createCartRaw(): Promise<RawCart> {
  const { data } = await authenticatedFetch<RawCart>("cart/create", {
    method: "POST",
  });
  return data;
}

export async function fetchCartRaw(token: string): Promise<RawCart> {
  const { data } = await authenticatedFetch<RawCart>("cart", {
    headers: { "x-cart-token": token },
  });
  return data;
}

export async function addCartItemRaw(
  token: string,
  productId: string,
  quantity: number,
): Promise<RawCart> {
  const { data } = await authenticatedFetch<RawCart>("cart", {
    method: "POST",
    headers: { "x-cart-token": token },
    body: { productId, quantity },
  });
  return data;
}

export async function updateCartItemRaw(
  token: string,
  itemId: string,
  quantity: number,
): Promise<RawCart> {
  const { data } = await authenticatedFetch<RawCart>(`cart/${itemId}`, {
    method: "PATCH",
    headers: { "x-cart-token": token },
    body: { quantity },
  });
  return data;
}

export async function removeCartItemRaw(
  token: string,
  itemId: string,
): Promise<RawCart> {
  const { data } = await authenticatedFetch<RawCart>(`cart/${itemId}`, {
    method: "DELETE",
    headers: { "x-cart-token": token },
  });
  return data;
}
