"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useOptimistic,
  useState,
} from "react";

import {
  addToCartAction,
  getCartAction,
  removeFromCartAction,
  updateCartQuantityAction,
} from "@/lib/server/cart-actions";

const TOKEN_KEY = "vercel-swag-cart-token";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  priceCents: number;
  quantity: number;
  lineTotalCents: number;
};

export type CartItemInfo = Omit<CartItem, "quantity" | "lineTotalCents">;

type CartView = {
  items: CartItem[];
  totalQuantity: number;
  subtotalCents: number;
  currency: string;
};

const EMPTY_CART: CartView = {
  items: [],
  totalQuantity: 0,
  subtotalCents: 0,
  currency: "USD",
};

type CartContextValue = CartView & {
  addItem: (info: CartItemInfo, quantity: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

type OptimisticAction =
  | { type: "add"; info: CartItemInfo; quantity: number }
  | { type: "update"; id: string; quantity: number }
  | { type: "remove"; id: string };

function recompute(items: CartItem[], currency: string): CartView {
  return {
    items,
    totalQuantity: items.reduce((sum, it) => sum + it.quantity, 0),
    subtotalCents: items.reduce((sum, it) => sum + it.lineTotalCents, 0),
    currency,
  };
}

function optimisticReducer(
  state: CartView,
  action: OptimisticAction,
): CartView {
  switch (action.type) {
    case "add": {
      const existing = state.items.find((it) => it.id === action.info.id);
      const items: CartItem[] = existing
        ? state.items.map((it) =>
            it.id === action.info.id
              ? {
                  ...it,
                  quantity: it.quantity + action.quantity,
                  lineTotalCents:
                    it.priceCents * (it.quantity + action.quantity),
                }
              : it,
          )
        : [
            ...state.items,
            {
              ...action.info,
              quantity: action.quantity,
              lineTotalCents: action.info.priceCents * action.quantity,
            },
          ];
      return recompute(items, state.currency);
    }
    case "update": {
      if (action.quantity <= 0) {
        return recompute(
          state.items.filter((it) => it.id !== action.id),
          state.currency,
        );
      }
      const items = state.items.map((it) =>
        it.id === action.id
          ? {
              ...it,
              quantity: action.quantity,
              lineTotalCents: it.priceCents * action.quantity,
            }
          : it,
      );
      return recompute(items, state.currency);
    }
    case "remove":
      return recompute(
        state.items.filter((it) => it.id !== action.id),
        state.currency,
      );
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [cart, setCart] = useState<CartView>(EMPTY_CART);

  const [optimisticCart, applyOptimistic] = useOptimistic<
    CartView,
    OptimisticAction
  >(cart, optimisticReducer);

  // Hydrate token from sessionStorage and load cart from server.
  useEffect(() => {
    const stored = sessionStorage.getItem(TOKEN_KEY);
    if (!stored) return;

    getCartAction(stored)
      .then((dto) => {
        if (!dto) {
          // Token is stale — drop it.
          sessionStorage.removeItem(TOKEN_KEY);
          return;
        }
        setToken(stored);
        setCart({
          items: dto.items,
          totalQuantity: dto.totalQuantity,
          subtotalCents: dto.subtotalCents,
          currency: dto.currency,
        });
      })
      .catch(() => {
        sessionStorage.removeItem(TOKEN_KEY);
      });
  }, []);

  const addItem = useCallback(
    (info: CartItemInfo, quantity: number) => {
      startTransition(async () => {
        applyOptimistic({ type: "add", info, quantity });
        try {
          const dto = await addToCartAction(token, info.id, quantity);
          if (!token || dto.token !== token) {
            sessionStorage.setItem(TOKEN_KEY, dto.token);
            setToken(dto.token);
          }
          setCart({
            items: dto.items,
            totalQuantity: dto.totalQuantity,
            subtotalCents: dto.subtotalCents,
            currency: dto.currency,
          });
        } catch (err) {
          console.error("addToCart failed:", err);
        }
      });
    },
    [token, applyOptimistic],
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (!token) return;
      startTransition(async () => {
        applyOptimistic({ type: "update", id, quantity });
        try {
          const dto = await updateCartQuantityAction(token, id, quantity);
          setCart({
            items: dto.items,
            totalQuantity: dto.totalQuantity,
            subtotalCents: dto.subtotalCents,
            currency: dto.currency,
          });
        } catch (err) {
          console.error("updateQuantity failed:", err);
        }
      });
    },
    [token, applyOptimistic],
  );

  const removeItem = useCallback(
    (id: string) => {
      if (!token) return;
      startTransition(async () => {
        applyOptimistic({ type: "remove", id });
        try {
          const dto = await removeFromCartAction(token, id);
          setCart({
            items: dto.items,
            totalQuantity: dto.totalQuantity,
            subtotalCents: dto.subtotalCents,
            currency: dto.currency,
          });
        } catch (err) {
          console.error("removeItem failed:", err);
        }
      });
    },
    [token, applyOptimistic],
  );

  const value: CartContextValue = {
    ...optimisticCart,
    addItem,
    updateQuantity,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within <CartProvider>");
  }
  return ctx;
}
