import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata = { title: "Shipping Policy | TechCorp" };

export default function ShippingPolicyPage() {
  return (
    <LegalPageLayout title="Shipping Policy" updatedAt="January 15, 2026">
      <h2>1. Turnaround Time</h2>
      <p>
        Orders placed before 2:00 PM EST (Mon-Fri) typically ship the same day.
        Orders placed after the cutoff or on weekends will ship the next
        business day. Large palletized orders (LTL) may require an additional 24
        hours for staging and wrapping.
      </p>

      <h2>2. Shipping Methods</h2>
      <ul>
        <li>
          <strong>Parcel (FedEx/UPS):</strong> For orders under 150 lbs.
        </li>
        <li>
          <strong>LTL Freight:</strong> For palletized orders. We use major
          carriers (R&L, XPO, Estes). Liftgate service must be requested at
          checkout.
        </li>
        <li>
          <strong>Customer Routing:</strong> You may provide your own FedEx/UPS
          account number or arrange your own freight pickup (Ex Works).
        </li>
      </ul>

      <h2>3. FOB Terms</h2>
      <p>
        All shipments are <strong>FOB Origin</strong> (our warehouse in CA).
        Title and risk of loss pass to the Buyer once the carrier picks up the
        goods. We strongly recommend purchasing shipping insurance for
        high-value orders.
      </p>

      <h2>4. International Shipping</h2>
      <p>
        We ship globally via DHL Express or Air Freight. The Buyer is the
        &quot;Importer of Record&quot; and is responsible for all duties, VAT,
        and customs clearance fees. We will provide a Commercial Invoice and
        Packing List with every international shipment.
      </p>
    </LegalPageLayout>
  );
}
