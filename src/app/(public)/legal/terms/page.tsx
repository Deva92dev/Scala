import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata = { title: "Terms of Service | TechCorp" };

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" updatedAt="January 1, 2026">
      <p>
        These Terms of Service (&quot;Agreement&quot;) constitute a legally
        binding agreement between TechCorp Inc. (&quot;Vendor&quot;) and the
        purchasing entity (&quot;Buyer&quot;).
      </p>

      <h2>1. Account Eligibility</h2>
      <p>
        TechCorp is a B2B-only platform. By registering, you certify that you
        are a valid legal business entity with a Reseller Certificate or Tax ID.
        We reserve the right to demand proof of business status at any time and
        may suspend accounts that fail to provide it.
      </p>

      <h2>2. Payment Terms</h2>
      <ul>
        <li>
          <strong>Standard Terms:</strong> Unless otherwise negotiated, all
          orders must be paid in full prior to shipment.
        </li>
        <li>
          <strong>Net Terms:</strong> Buyers approved for Net-30 or Net-60 terms
          must settle invoices within the agreed window. Late payments will
          incur a service charge of 1.5% per month (18% APR) or the maximum
          allowed by law.
        </li>
        <li>
          <strong>Credit Limits:</strong> We reserve the right to adjust or
          revoke credit limits based on periodic reviews of your
          creditworthiness.
        </li>
      </ul>

      <h2>3. Pricing & Inventory</h2>
      <p>
        Wholesale pricing is confidential. Sharing your Tiered Pricing with
        third parties or competitors is grounds for immediate account
        termination. Inventory levels are dynamic; adding an item to the cart
        does not reserve stock until checkout is confirmed.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        In no event shall TechCorp be liable for any indirect, incidental,
        special, or consequential damages (including lost profits) arising out
        of late shipments, carrier delays, or product defects, even if advised
        of the possibility of such damages.
      </p>

      <h2>5. Governing Law</h2>
      <p>
        These terms shall be governed by the laws of the State of California.
        Any disputes arising from this agreement shall be resolved through
        binding arbitration in San Francisco, CA.
      </p>
    </LegalPageLayout>
  );
}
