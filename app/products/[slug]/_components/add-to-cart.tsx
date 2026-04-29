"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddToCart({ stock }: { stock: number }) {
  const isOutOfStock = stock === 0;
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-3">
      <p className={`text-sm ${isOutOfStock ? "text-destructive" : ""}`}>
        {isOutOfStock ? "Out of stock" : `${stock} in stock`}
      </p>
      <div className="flex gap-2">
        <Input
          type="number"
          min={1}
          max={stock || 1}
          value={quantity}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (Number.isNaN(next)) return;
            setQuantity(Math.max(1, Math.min(stock, next)));
          }}
          disabled={isOutOfStock}
          className="w-20"
          aria-label="Quantity"
        />
        <Button
          type="button"
          disabled={isOutOfStock}
          className="flex-1"
          onClick={() => {
            // TODO make me work later
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
