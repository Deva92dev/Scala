import CartItemRow from "@/components/dashboard/cart/CartItemRow";
import { Button } from "@/components/ui/button";
import { getCartDetails } from "@/db/data-access/cart";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import ClearCartButton from "./ClearCartButton";
import { createOrderFromCart } from "@/db/actions/OrderActions";
import { PriceTag } from "@/components/shared/PriceTagBasic";
import PrintQuoteButton from "./PrintQuoteButton";

interface Props {
  userId: string;
  orgId: string;
}

const CartDashboard = async ({ orgId, userId }: Props) => {
  const cart = await getCartDetails(userId, orgId);

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <section className="max-w-5xl mx-auto h-[calc(100vh - 100px)] flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <ShoppingCart className="h-6 w-6" />
          Shopping Cart
        </h1>
        <div className="text-sm text-muted-foreground">
          Reference ID: {cart?.id?.slice(0, 8) || "N/A"}
        </div>
      </div>

      {/* EMPTY STATE */}
      {isEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/30">
          <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center mb-4 text-secondary-foreground">
            <ShoppingCart className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6 max-w-sm text-center">
            Looks like you have not added any items yet.
          </p>
          <Link href="/dashboard/catalog" className="mb-4">
            <Button>Browse Catalog</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: ITEMS LIST */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="text-sm font-medium text-muted-foreground">
                {cart.items.length} Items in the cart
              </div>
              <ClearCartButton />
            </div>
            {cart.items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="font-semibold text-lg mb-4 text-foreground">
                Order Summary
              </h2>

              <div className="space-y-3 border-b border-border pb-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <PriceTag amount={cart.subtotal} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span className="text-muted-foreground italic">
                    Calculated at Checkout
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-700 dark:text-green-400 font-medium">
                    Free
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-6">
                <span className="font-bold text-lg">Total</span>
                <PriceTag
                  amount={cart.subtotal}
                  className="text-xl font-bold"
                />
              </div>

              <div className="spacey-3 flex flex-col gap-4">
                <PrintQuoteButton />
                <form action={createOrderFromCart}>
                  <input type="hidden" name="poNumber" value="" />
                  <Button
                    className="w-full h-11 text-md"
                    size="lg"
                    type="submit"
                  >
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>

              <p className="text-xs text-center text-muted-foreground mt-4">
                By proceeding, you agree to the organization purchasing terms.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartDashboard;
