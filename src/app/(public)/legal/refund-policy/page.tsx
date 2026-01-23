import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata = { title: "Refund & Cancellation Policy | TechCorp" };

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      title="Refund & Cancellation Policy"
      updatedAt="January 15, 2026"
    >
      <p>
        Unlike B2C retail, B2B procurement involves significant logistics costs.
        Our policies are designed to be fair but strict to maintain low
        wholesale margins.
      </p>

      <h2>1. Order Cancellations</h2>
      <p>
        Orders may be cancelled free of charge within <strong>1 hour</strong> of
        placement. After this window, orders are pushed to our WMS (Warehouse
        Management System) for palletization.
      </p>
      <ul>
        <li>
          <strong>Pre-Shipment Cancellation:</strong> If an order has been
          picked but not shipped, a 15% restocking fee applies.
        </li>
        <li>
          <strong>Shipped Orders:</strong> Once a Bill of Lading (BOL) or
          tracking number is generated, the order cannot be cancelled. It must
          be treated as a Return.
        </li>
      </ul>

      <h2>2. Returns & RMAs</h2>
      <p>
        We do not accept returns for &quot;Change of Mind&quot; or
        &quot;Overstock&quot;. Returns are only accepted for:
      </p>
      <ul>
        <li>
          <strong>Defective / DOA Units:</strong> Must be reported within 7 days
          of delivery.
        </li>
        <li>
          <strong>Shipping Damage:</strong> Must be noted on the Carrier&apos;s
          Proof of Delivery (POD) at the time of receipt.
        </li>
        <li>
          <strong>Incorrect Item Shipped:</strong> Must be reported within 48
          hours.
        </li>
      </ul>
      <p>
        All returns require a Return Merchandise Authorization (RMA) number.
        Returns received without an RMA will be refused at the dock.
      </p>

      <h2>3. Restocking Fees</h2>
      <p>
        Authorized returns for non-defective items (if approved as an exception)
        are subject to a <strong>25% restocking fee</strong> plus the cost of
        return freight. Items must be factory sealed. Open-box items are not
        eligible for return.
      </p>

      <h2>4. Refunds</h2>
      <p>
        Refunds are processed as <strong>Account Credit</strong> for future
        orders. Cash refunds are only issued if the account is being closed and
        all outstanding balances are settled.
      </p>
    </LegalPageLayout>
  );
}
