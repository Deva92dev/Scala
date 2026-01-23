import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata = { title: "Privacy Policy | TechCorp" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updatedAt="January 15, 2026">
      <p>
        At TechCorp, we take the privacy of our business partners seriously.
        This policy outlines how we collect, use, and protect your corporate and
        personal data.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect information necessary to facilitate B2B transactions and
        credit assessments:
      </p>
      <ul>
        <li>
          <strong>Account Information:</strong> Business Name, Tax ID (EIN),
          DUNS Number, and Authorized Officer details.
        </li>
        <li>
          <strong>Financial Data:</strong> Bank references, trade references,
          and financial statements provided for Net-60 credit applications.
        </li>
        <li>
          <strong>Usage Data:</strong> IP addresses, browser types, and catalog
          interaction history to improve our platform.
        </li>
      </ul>

      <h2>2. How We Use Your Data</h2>
      <p>Your data is used strictly for legitimate business purposes:</p>
      <ul>
        <li>Processing wholesale orders and freight shipments.</li>
        <li>
          Conducting credit risk assessments via third-party bureaus (e.g., Dun
          & Bradstreet).
        </li>
        <li>
          Sending transactional emails (Invoices, PO Acknowledgements, Shipping
          Manifests).
        </li>
        <li>
          We <strong>do not</strong> sell your data to marketing agencies or
          third-party list brokers.
        </li>
      </ul>

      <h2>3. Data Security</h2>
      <p>
        We employ enterprise-grade security measures, including SOC2-compliant
        data centers and AES-256 encryption for all sensitive documents (such as
        Tax IDs and Financial Statements). Access to credit data is restricted
        to authorized finance personnel only.
      </p>

      <h2>4. Cookies & Tracking</h2>
      <p>
        We use essential cookies to maintain your session security and cart
        integrity. Analytics cookies are used to monitor platform performance
        but can be opted out of via your browser settings.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        For data deletion requests or privacy inquiries, please contact our Data
        Protection Officer at: <br />
        <a
          href="mailto:privacy@techcorp.com"
          className="text-primary hover:underline"
        >
          privacy@techcorp.com
        </a>
      </p>
    </LegalPageLayout>
  );
}
