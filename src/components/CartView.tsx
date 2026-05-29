import { useEffect, useState } from "react";
import { currentCart } from "@wix/ecom";
import { redirects } from "@wix/redirects";

interface LineItem {
  _id?: string | null;
  productName?: { translated?: string };
  quantity?: number;
  price?: { formattedConvertedAmount?: string };
  lineItemPrice?: { formattedConvertedAmount?: string };
  image?: string;
  url?: string | { relativePath?: string; url?: string };
}

function resolveCartImage(image: string | undefined): string | undefined {
  if (!image) return undefined;
  if (image.startsWith("wix:image://")) {
    const match = image.match(/wix:image:\/\/v1\/([^/]+)/);
    if (match) return `https://static.wixstatic.com/media/${match[1]}`;
  }
  return image;
}

function resolveProductHref(item: LineItem): string | undefined {
  const url = item.url;
  if (!url) return undefined;
  const str = typeof url === "string" ? url : (url.relativePath ?? url.url);
  if (!str) return undefined;
  const match = str.match(/\/product-page\/([^/?#]+)/);
  return match ? `/product/${match[1]}` : undefined;
}

export default function CartView() {
  const [items, setItems] = useState<LineItem[]>([]);
  const [summary, setSummary] = useState<{ subtotal?: string; total?: string }>({});
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  const loadCart = async () => {
    try {
      const cart = await currentCart.getCurrentCart();
      setItems((cart.lineItems as unknown as LineItem[]) ?? []);
      setSummary({
        subtotal: cart.priceSummary?.subtotal?.formattedConvertedAmount,
        total: cart.priceSummary?.total?.formattedConvertedAmount,
      });
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCart(); }, []);

  const handleQty = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(it => it._id === itemId ? { ...it, quantity } : it));
    try {
      await currentCart.updateCurrentCartLineItemQuantity([{ _id: itemId, quantity }]);
      window.dispatchEvent(new CustomEvent("cart-updated"));
      await loadCart();
    } catch {
      await loadCart();
    }
  };

  const handleRemove = async (itemId: string) => {
    setItems(prev => prev.filter(it => it._id !== itemId));
    try {
      await currentCart.removeLineItemsFromCurrentCart([itemId]);
      window.dispatchEvent(new CustomEvent("cart-updated"));
      await loadCart();
    } catch {
      await loadCart();
    }
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const { checkoutId } = await currentCart.createCheckoutFromCurrentCart({
        channelType: currentCart.ChannelType.WEB,
      });
      const { redirectSession } = await redirects.createRedirectSession({
        ecomCheckout: { checkoutId },
        callbacks: {
          postFlowUrl: window.location.origin,
          thankYouPageUrl: `${window.location.origin}/thank-you`,
          cartPageUrl: `${window.location.origin}/cart`,
        },
      });
      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (e) {
      console.error("Checkout failed:", e);
      setCheckingOut(false);
    }
  };

  if (loading) {
    return <p className="text-on-surface-variant text-center py-16">Loading cart…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-body-lg text-on-surface-variant mb-8">Your cart is empty.</p>
        <a href="/shop" className="inline-block border border-primary text-primary px-12 py-4 font-label-md text-label-md uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300 no-underline">Browse the Collection</a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_22rem] gap-12 lg:gap-16 items-start">
      {/* Line items */}
      <div className="flex flex-col">
        {items.map(item => {
          const href = resolveProductHref(item);
          const img = resolveCartImage(item.image);
          const name = item.productName?.translated ?? "Untitled";

          return (
            <div key={item._id} className="flex gap-6 py-8 border-b border-outline-variant last:border-0">
              {img && (
                href
                  ? <a href={href} className="shrink-0 w-32 h-40 overflow-hidden bg-surface-container-low block"><img src={img} alt={name} className="w-full h-full object-cover" /></a>
                  : <div className="shrink-0 w-32 h-40 overflow-hidden bg-surface-container-low"><img src={img} alt={name} className="w-full h-full object-cover" /></div>
              )}
              <div className="flex-1 flex flex-col gap-3">
                <h3 className="font-headline-md text-headline-md uppercase">
                  {href ? <a href={href} className="hover:text-primary transition-colors no-underline text-on-surface">{name}</a> : name}
                </h3>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => item._id && handleQty(item._id, (item.quantity ?? 1) - 1)}
                    disabled={!item.quantity || item.quantity <= 1}
                    className="w-8 h-8 border border-outline-variant text-on-surface hover:border-primary disabled:opacity-30 transition-all"
                  >−</button>
                  <span className="font-label-md text-label-md w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => item._id && handleQty(item._id, (item.quantity ?? 1) + 1)}
                    className="w-8 h-8 border border-outline-variant text-on-surface hover:border-primary transition-all"
                  >+</button>
                </div>
                <button
                  onClick={() => item._id && handleRemove(item._id)}
                  className="font-caption text-caption text-on-surface-variant hover:text-primary uppercase tracking-widest underline underline-offset-4 self-start mt-2"
                >Remove</button>
              </div>
              <div className="text-right flex flex-col gap-1">
                <span className="font-headline-md text-primary">{item.price?.formattedConvertedAmount}</span>
                {(item.quantity ?? 1) > 1 && (
                  <span className="font-caption text-caption text-on-surface-variant">Total {item.lineItemPrice?.formattedConvertedAmount}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <aside className="bg-surface-container-low border border-outline-variant/30 p-8 flex flex-col gap-6 sticky top-32">
        <h3 className="font-label-md text-label-md text-primary uppercase tracking-widest pb-4 border-b border-outline-variant">Order Summary</h3>
        <div className="flex justify-between items-baseline">
          <span className="font-body-md text-on-surface-variant">Subtotal</span>
          <span className="font-headline-md text-on-surface">{summary.subtotal}</span>
        </div>
        {summary.total && summary.total !== summary.subtotal && (
          <div className="flex justify-between items-baseline pt-4 border-t border-outline-variant">
            <span className="font-label-md text-label-md uppercase tracking-widest">Total</span>
            <span className="font-headline-md text-primary">{summary.total}</span>
          </div>
        )}
        <button
          onClick={handleCheckout}
          disabled={checkingOut}
          className="w-full bg-primary text-on-primary py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {checkingOut ? "Redirecting…" : "Proceed to Checkout"}
        </button>
        <p className="font-caption text-caption text-on-surface-variant text-center">Shipping calculated at checkout.</p>
      </aside>
    </div>
  );
}
