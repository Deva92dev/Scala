/* eslint-disable @typescript-eslint/no-unused-vars */
import DashboardGate from "@/components/dashboard/DashboardGate";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

interface PageProps {
  searchParams: Promise<{
    payment_intent?: string;
    payment_intent_client_secret?: string;
  }>;
}

async function SuccessContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const paymentIntentId = params.payment_intent;

  if (!paymentIntentId) {
    return redirect("/dashboard/orders");
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  let title = "Order Confirmed!";
  let description =
    "Thank you for your purchase. Your order is being processed.";
  let isSuccess = true;

  switch (paymentIntent.status) {
    case "succeeded":
      title = "Payment Successful";
      description = "We have received your payment and created your order.";
      break;
    case "processing":
      title = "Payment Processing";
      description = "We are waiting for confirmation from your bank.";
      break;
    case "requires_payment_method":
      title = "Payment Failed";
      description = "Your payment could not be processed. Please try again.";
      isSuccess = false;
      break;
    default:
      title = "Something went wrong";
      isSuccess = false;
  }

  return (
    <DashboardGate>
      {(ctx) => (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-4">
          <div
            className={`rounded-full p-4 mb-6 ${isSuccess ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-12 h-12" />
            ) : (
              <Loader2 className="w-12 h-12" />
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground max-w-md mb-8">{description}</p>
          <div className="flex gap-4">
            <Link href="/dashboard/orders">
              <Button variant="outline">View Order History</Button>
            </Link>
            {isSuccess && (
              <Link href="/dashboard/catalog">
                <Button>
                  Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </DashboardGate>
  );
}

export default function OrderSuccessPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="p-10 flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <SuccessContent searchParams={props.searchParams} />
    </Suspense>
  );
}
