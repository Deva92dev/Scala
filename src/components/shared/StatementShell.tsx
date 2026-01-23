import { requireAuthWithOrg } from "@/db/data-access/users";
import { getMonthlyStatement } from "@/db/data-access/statement";
import AutoPrintControl from "@/components/dashboard/cart/AutoPrintControl";
import { format } from "date-fns";
import { PriceTag } from "./PriceTagBasic";

interface StatementShellProps {
  month: number; // 0-11
  year: number;
}

export async function StatementShell({ month, year }: StatementShellProps) {
  const { orgId } = await requireAuthWithOrg();
  const data = await getMonthlyStatement(orgId, month, year);

  return (
    <div className="min-h-screen bg-white text-black p-8 max-w-[210mm] mx-auto print:max-w-none">
      <AutoPrintControl />

      {/* HEADER */}
      <header className="flex justify-between items-start border-b-2 border-black pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight">
            Statement
          </h1>
          <p className="font-medium mt-1">{data.org.name}</p>
          <p className="text-sm text-gray-500">
            Tax ID: {data.org.taxIdentifier || "N/A"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Statement Period</p>
          <p className="font-bold text-lg">
            {format(data.period.start, "MMMM yyyy")}
          </p>
          <div className="mt-2 bg-gray-100 p-2 rounded text-left min-w-37.5">
            <span className="text-xs text-gray-500 block">Total Spend</span>
            <PriceTag amount={data.totalSpend} className="text-xl font-bold" />
          </div>
        </div>
      </header>

      {/* TABLE */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-black">
            <th className="text-left py-2 font-bold">Date</th>
            <th className="text-left py-2 font-bold">Order ID</th>
            <th className="text-left py-2 font-bold">Status</th>
            <th className="text-right py-2 font-bold">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.orders.map((order) => (
            <tr key={order.id} className="break-inside-avoid">
              <td className="py-3">
                {format(new Date(order.createdAt), "MMM dd, yyyy")}
              </td>
              <td className="py-3 font-mono text-xs">{order.id.slice(0, 8)}</td>
              <td className="py-3 uppercase text-xs font-semibold tracking-wider">
                {order.status.replace("_", " ")}
              </td>
              <td className="py-3 text-right">
                <PriceTag amount={Number(order.totalAmount)} />
              </td>
            </tr>
          ))}
          {data.orders.length === 0 && (
            <tr>
              <td colSpan={4} className="py-8 text-center text-gray-500 italic">
                No orders found for this period.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <footer className="fixed bottom-8 left-0 right-0 text-center text-xs text-gray-400 print:block hidden">
        Generated on {format(new Date(), "PPpp")}
      </footer>
    </div>
  );
}
