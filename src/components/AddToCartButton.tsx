import { useState } from "react";
import { currentCart } from "@wix/ecom";

const WIX_STORES_APP_ID = "215238eb-22a5-4c36-9e7b-e7c08025e04e";

interface Props {
  productId: string;
  variantId?: string;
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({ productId, variantId, quantity = 1, className }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "added" | "error">("idle");

  const handleClick = async () => {
    setStatus("loading");
    try {
      const options: Record<string, unknown> = {};
      if (variantId) options.variantId = variantId;
      await currentCart.addToCurrentCart({
        lineItems: [{
          catalogReference: {
            appId: WIX_STORES_APP_ID,
            catalogItemId: productId,
            options: Object.keys(options).length > 0 ? options : undefined,
          },
          quantity,
        }],
      });
      setStatus("added");
      window.dispatchEvent(new CustomEvent("cart-updated"));
      setTimeout(() => setStatus("idle"), 2500);
    } catch (e) {
      console.error("Add to cart failed:", e);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  const label = {
    idle: "Add to Cart",
    loading: "Adding…",
    added: "Added ✓",
    error: "Failed — Retry",
  }[status];

  return (
    <button
      onClick={handleClick}
      disabled={status === "loading" || status === "added"}
      className={className}
    >
      {label}
    </button>
  );
}
