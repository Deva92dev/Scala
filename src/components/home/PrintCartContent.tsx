import { getCartDetails } from "@/db/data-access/cart";
import { requireAuthWithOrg } from "@/db/data-access/users";
import { redirect } from "next/navigation";
import AutoPrintControl from "@/components/dashboard/cart/AutoPrintControl";
import { format } from "date-fns";
import { PriceTag } from "@/components/shared/PriceTagBasic";

export async function PrintCartContent() {
  const { orgId, userId } = await requireAuthWithOrg();
  const cart = await getCartDetails(userId, orgId);

  if (!cart || cart.items.length === 0) {
    return redirect("/dashboard/cart");
  }

  // Calculate Tax/Shipping explicitly for the view
  const subtotal = cart.subtotal;
  const tax = subtotal * 0.1;
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-white text-black p-8 max-w-[210mm] mx-auto">
      {/* Client Component to trigger window.print() */}
      <AutoPrintControl />

      {/* HEADER */}
      <header className="flex justify-between items-start border-b pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black">
            SCALA B2B
          </h1>
          <p className="text-sm text-gray-500 mt-1">Procurement Platform</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold uppercase tracking-wider text-gray-400">
            Pro Forma Quote
          </h2>
          <div className="mt-2 text-sm">
            <p>Date: {format(new Date(), "MMM dd, yyyy")}</p>
            <p>Ref: {cart.id.slice(0, 8).toUpperCase()}</p>
          </div>
        </div>
      </header>

      {/* TABLE */}
      <table className="w-full text-sm mb-8">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="text-left py-2">Item</th>
            <th className="text-left py-2">SKU</th>
            <th className="text-center py-2">Qty</th>
            <th className="text-right py-2">Unit Price</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {cart.items.map((item) => (
            <tr key={item.id}>
              <td className="py-3 font-medium">{item.product.name}</td>
              <td className="py-3 font-mono text-gray-500">
                {item.product.slug}
              </td>
              <td className="py-3 text-center">{item.quantity}</td>
              <td className="py-3 text-right">
                <PriceTag amount={Number(item.product.basePrice)} />
              </td>
              <td className="py-3 text-right font-bold">
                <PriceTag
                  amount={Number(item.product.basePrice) * item.quantity}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <div className="flex justify-end">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <PriceTag amount={subtotal} />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (10%):</span>
            <PriceTag amount={tax} />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping:</span>
            <PriceTag amount={shipping} />
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
            <span>Total:</span>
            <PriceTag amount={total} />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-12 pt-8 border-t text-center text-xs text-gray-400">
        <p>
          This is a generated quote. Prices are subject to change. Valid for 30
          days.
        </p>
        <p>Scala B2B Inc. | 123 Tech Blvd, Innovation City</p>
      </footer>
    </div>
  );
}
