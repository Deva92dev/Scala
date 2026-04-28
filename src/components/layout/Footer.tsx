"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* COL 1: BRAND */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-xl tracking-tight text-foreground">
                ScalaB2B<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              The leading wholesale platform for enterprise electronics
              procurement. Net-60 terms, automated invoicing, and rapid
              fulfillment for modern businesses.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                aria-label="Follow us on LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                aria-label="Follow us on Twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                aria-label="Follow us on Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* COL 2: SOURCING */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Sourcing</h3>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li>
                <Link
                  href="/catalog"
                  className="hover:text-primary transition-colors"
                >
                  Browse Catalog
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=laptops"
                  className="hover:text-primary transition-colors"
                >
                  Laptops & Workstations
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=phones"
                  className="hover:text-primary transition-colors"
                >
                  Enterprise Mobility
                </Link>
              </li>
              <li>
                <Link
                  href="/login?intent=credit_application"
                  className="hover:text-primary transition-colors"
                >
                  Apply for Credit
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3: COMPANY & LEGAL */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/refund-policy"
                  className="hover:text-primary transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/shipping"
                  className="hover:text-primary transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 4: CONTACT */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
            <ul className="space-y-4 text-sm text-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>
                  123 Tech Blvd,
                  <br />
                  Suite 400
                  <br />
                  San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@scalab2b.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {currentYear} ScalaB2B. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Secure Payment:</span>
            <div className="flex gap-3 grayscale hover:grayscale-0 transition-all">
              <span className="font-semibold">Visa</span>
              <span className="font-semibold">Mastercard</span>
              <span className="font-semibold">Amex</span>
              <span className="font-semibold">ACH / Wire</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
