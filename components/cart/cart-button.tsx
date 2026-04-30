"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/format";

import { type CartItem, useCart } from "./cart-provider";

export function CartButton() {
  const { items, totalQuantity, subtotalCents } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={`Open cart (${totalQuantity} ${
            totalQuantity === 1 ? "item" : "items"
          })`}
        >
          <ShoppingCart className="h-5 w-5" />
          {totalQuantity > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
              {totalQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>
            {totalQuantity === 0
              ? "Your cart is empty."
              : `${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center px-6 py-12 text-center text-sm text-muted-foreground">
            Add items from a product page to get started.
          </div>
        ) : (
          <ul className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
            {items.map((item) => (
              <CartLineItem key={item.id} item={item} />
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <>
            <Separator />
            <SheetFooter className="px-6 py-4">
              <div className="flex w-full items-center justify-between text-base font-medium">
                <span>Subtotal</span>
                <span>{formatPrice(subtotalCents)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Taxes and shipping calculated at checkout.
              </p>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();
  const lineTotalCents = item.priceCents * item.quantity;

  return (
    <li className="flex gap-3">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-medium leading-tight">{item.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatPrice(item.priceCents)} each
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Remove ${item.name}`}
            onClick={() => removeItem(item.id)}
            className="h-7 w-7 text-muted-foreground"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label={`Decrease quantity of ${item.name}`}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="min-w-6 text-center text-sm tabular-nums">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label={`Increase quantity of ${item.name}`}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <span className="text-sm font-medium">
            {formatPrice(lineTotalCents)}
          </span>
        </div>
      </div>
    </li>
  );
}
