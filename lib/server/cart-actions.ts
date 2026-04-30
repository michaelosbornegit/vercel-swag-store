"use server";

import { ApiError } from "../api";
import {
  addCartItemRaw,
  createCartRaw,
  fetchCartRaw,
  removeCartItemRaw,
  updateCartItemRaw,
} from "./cart-api";
import { toCartDTO, type CartDTO } from "./cart-dto";

/**
 * Fetch the cart for an existing token, or return an empty cart if the token
 * is missing or the upstream cart no longer exists.
 */
export async function getCartAction(
  token: string | null,
): Promise<CartDTO | null> {
  if (!token) return null;
  try {
    const raw = await fetchCartRaw(token);
    return toCartDTO(raw);
  } catch (err) {
    if (err instanceof ApiError && err.code === "NOT_FOUND") return null;
    throw err;
  }
}

/**
 * Add a product to the cart. Lazily creates a cart on first use and returns
 * the (possibly new) token alongside the updated cart.
 */
export async function addToCartAction(
  token: string | null,
  productId: string,
  quantity: number,
): Promise<CartDTO> {
  let activeToken = token;
  if (!activeToken) {
    const created = await createCartRaw();
    activeToken = created.token;
  }
  const updated = await addCartItemRaw(activeToken, productId, quantity);
  return toCartDTO(updated);
}

export async function updateCartQuantityAction(
  token: string,
  itemId: string,
  quantity: number,
): Promise<CartDTO> {
  const updated = await updateCartItemRaw(token, itemId, quantity);
  return toCartDTO(updated);
}

export async function removeFromCartAction(
  token: string,
  itemId: string,
): Promise<CartDTO> {
  const updated = await removeCartItemRaw(token, itemId);
  return toCartDTO(updated);
}
