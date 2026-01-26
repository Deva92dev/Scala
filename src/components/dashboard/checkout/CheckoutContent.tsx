import { PriceTag } from "@/components/shared/PriceTagBasic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createStripePaymentIntent } from "@/db/actions/StripeActions";
import { getCartDetails } from "@/db/data-access/cart";
import { getCompanyOverview } from "@/db/data-access/company";
import { CreditCard, FileText } from "lucide-react";
import { redirect } from "next/navigation";
import NetTermsForm from "./NetTermsForm";
import StripePaymentForm from "./StripePaymentForm";

interface Props {
  userId: string;
  orgId: string;
}

export async function CheckoutContent({ userId, orgId }: Props) {
  const [cart, org, stripeData] = await Promise.all([
    getCartDetails(userId, orgId),
    getCompanyOverview(orgId),
    // This creates a draft intent for every visit
    createStripePaymentIntent().catch(() => null),
  ]);

  if (!cart || cart.items.length === 0) redirect("/dashboard/cart");

  const subtotal = cart.subtotal;
  const tax = subtotal * 0.1;
  const shipping = subtotal > 5000 ? 0 : 150;
  const orderTotal = subtotal + tax + shipping;

  const canUseNet30 = org.paymentTerms !== "prepaid";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* LEFT: Summary */}
      <div className="md:col-span-2 space-y-6">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <div className="bg-card border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between text-lg font-bold">
            <span>Total Due</span>
            <PriceTag amount={orderTotal} />
          </div>
          {/* Optional: List items */}
          <p className="text-sm text-muted-foreground mt-4">
            {cart.items.length} items in cart
          </p>
        </div>
      </div>

      {/* RIGHT: Payment Method Selection */}
      <div className="md:col-span-1">
        <div className="sticky top-6">
          <Tabs
            defaultValue={canUseNet30 ? "net30" : "card"}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="net30" disabled={!canUseNet30}>
                <FileText className="w-4 h-4 mr-2" />
                Net 30
              </TabsTrigger>
              <TabsTrigger value="card">
                <CreditCard className="w-4 h-4 mr-2" />
                Card
              </TabsTrigger>
            </TabsList>

            <TabsContent value="net30">
              <NetTermsForm
                cartTotal={orderTotal}
                creditLimit={Number(org.creditLimit)}
                usedCredit={Number(org.usedCredit)}
                terms={org.paymentTerms}
              />
            </TabsContent>

            <TabsContent value="card">
              <div className="bg-card border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Pay securely</h3>
                {stripeData ? (
                  <StripePaymentForm
                    clientSecret={stripeData.clientSecret}
                    paymentIntentId={stripeData.paymentIntentId}
                  />
                ) : (
                  <div className="text-red-800 text-sm p-4 bg-red-100 rounded border border-red-200">
                    Payment system currently unavailable.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
