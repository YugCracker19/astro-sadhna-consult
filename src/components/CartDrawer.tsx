import { useState } from "react";
import { z } from "zod";
import { Minus, Plus, Trash2, ShoppingBag, X, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCart, formatINR } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Name too short").max(60),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{7,15}$/, "Enter a valid phone number"),
  address: z.string().trim().min(10, "Please share full address").max(400),
  notes: z.string().trim().max(300).optional(),
});

const CartDrawer = () => {
  const { lang, tr } = useLang();
  const { items, isOpen, close, setQty, remove, total, count, clear } = useCart();
  const { toast } = useToast();
  const [stage, setStage] = useState<"cart" | "checkout">("cart");
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });

  const hi = lang === "hi";

  const handleCheckout = () => {
    const parsed = checkoutSchema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: hi ? "Galti hui" : "Invalid details",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }
    if (items.length === 0) return;

    const lines = [
      "*🛕 New Order — Astro Sadhna*",
      "",
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      `*Address:* ${form.address}`,
      form.notes ? `*Notes:* ${form.notes}` : null,
      "",
      "*Order:*",
      ...items.map(
        (i, idx) =>
          `${idx + 1}. ${i.product.name} × ${i.qty} — ${formatINR(
            i.product.price * i.qty
          )}`
      ),
      "",
      `*Total: ${formatINR(total)}*`,
      "",
      "Please confirm availability and share payment details. 🙏",
    ]
      .filter(Boolean)
      .join("\n");

    const link = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
      lines
    )}`;

    toast({
      title: hi ? "Order WhatsApp par bhej rahe hain" : "Sending order on WhatsApp",
      description: hi ? "Confirm karke send dabaayein." : "Tap send to confirm.",
    });

    clear();
    close();
    setStage("cart");
    setForm({ name: "", phone: "", address: "", notes: "" });

    window.location.href = link;
  };

  return (
    <Sheet open={isOpen} onOpenChange={(v) => !v && close()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border/60">
          <SheetTitle className="flex items-center gap-2 font-display text-2xl">
            <ShoppingBag className="w-5 h-5 text-primary" />
            {stage === "cart"
              ? hi
                ? "Aapki Cart"
                : "Your Cart"
              : hi
              ? "Checkout"
              : "Checkout"}
            {count > 0 && stage === "cart" && (
              <span className="text-sm text-muted-foreground font-normal">
                ({count})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-primary" />
            </div>
            <p className="font-display text-xl font-semibold mb-1">
              {hi ? "Cart khali hai" : "Your cart is empty"}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {hi
                ? "Pavitra vastuein add karke shuru karein."
                : "Add some sacred products to begin."}
            </p>
            <Button onClick={close} variant="outline">
              {hi ? "Shopping jaari rakhein" : "Continue shopping"}
            </Button>
          </div>
        ) : stage === "cart" ? (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((i) => (
                <div
                  key={i.product.id}
                  className="flex gap-3 p-3 rounded-xl border border-border/60 bg-card"
                >
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center text-2xl shrink-0">
                    {i.product.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-sm leading-snug">
                        {hi ? i.product.nameHi : i.product.name}
                      </p>
                      <button
                        onClick={() => remove(i.product.id)}
                        aria-label="Remove"
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {formatINR(i.product.price)}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center border border-border rounded-full">
                        <button
                          onClick={() => setQty(i.product.id, i.qty - 1)}
                          className="w-7 h-7 inline-flex items-center justify-center hover:text-primary"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-medium">
                          {i.qty}
                        </span>
                        <button
                          onClick={() => setQty(i.product.id, i.qty + 1)}
                          className="w-7 h-7 inline-flex items-center justify-center hover:text-primary"
                          aria-label="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatINR(i.product.price * i.qty)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border/60 px-6 py-4 space-y-3 bg-secondary/40">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {hi ? "Total" : "Total"}
                </span>
                <span className="font-display text-2xl font-bold text-primary">
                  {formatINR(total)}
                </span>
              </div>
              <Button
                onClick={() => setStage("checkout")}
                className="w-full btn-glow text-primary-foreground font-semibold h-12 rounded-full"
              >
                {hi ? "Checkout karein" : "Proceed to Checkout"}
              </Button>
              <button
                onClick={clear}
                className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                {hi ? "Cart khali karein" : "Clear cart"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <button
                onClick={() => setStage("cart")}
                className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1"
              >
                <X className="w-3 h-3" /> {hi ? "Wapas cart" : "Back to cart"}
              </button>

              <div>
                <Label htmlFor="co-name">{hi ? "Aapka naam" : "Your name"}</Label>
                <Input
                  id="co-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={hi ? "Pura naam" : "Full name"}
                  maxLength={60}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="co-phone">
                  {hi ? "Phone number" : "Phone number"}
                </Label>
                <Input
                  id="co-phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 9XXXXXXXXX"
                  maxLength={15}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="co-addr">
                  {hi ? "Shipping address" : "Shipping address"}
                </Label>
                <Textarea
                  id="co-addr"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder={
                    hi
                      ? "Ghar / Flat, Street, City, State, Pincode"
                      : "House / Flat, Street, City, State, Pincode"
                  }
                  rows={3}
                  maxLength={400}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="co-notes">
                  {hi ? "Notes (optional)" : "Notes (optional)"}
                </Label>
                <Textarea
                  id="co-notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder={
                    hi
                      ? "Koi vishesh request..."
                      : "Any special request..."
                  }
                  rows={2}
                  maxLength={300}
                  className="mt-1.5"
                />
              </div>

              <div className="rounded-xl border border-border/60 bg-card p-4 space-y-1.5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {hi ? "Order summary" : "Order summary"}
                </p>
                {items.map((i) => (
                  <div
                    key={i.product.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="truncate pr-2">
                      {hi ? i.product.nameHi : i.product.name} × {i.qty}
                    </span>
                    <span className="font-medium shrink-0">
                      {formatINR(i.product.price * i.qty)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 mt-2 border-t border-border/60 font-semibold">
                  <span>{hi ? "Total" : "Total"}</span>
                  <span className="text-primary">{formatINR(total)}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border/60 px-6 py-4 bg-secondary/40">
              <Button
                onClick={handleCheckout}
                className="w-full btn-glow text-primary-foreground font-semibold h-12 rounded-full inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {hi
                  ? "Order WhatsApp par bhejein"
                  : "Place Order on WhatsApp"}
              </Button>
              <p className="text-[11px] text-muted-foreground text-center mt-2">
                {hi
                  ? "Order details WhatsApp par bhej diye jaayenge confirmation ke liye."
                  : "Order details will open in WhatsApp for confirmation."}
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
