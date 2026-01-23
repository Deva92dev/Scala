"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What happens if a shipment arrives damaged?",
    answer:
      "We take full responsibility. All B2B shipments are fully insured. Simply send us a photo of the damage within 48 hours of delivery, and we will ship a replacement unit immediately via overnight freight, no questions asked.",
  },
  {
    question: "Do you offer Net-60 terms?",
    answer:
      "Yes. We partner with major credit bureaus (D&B, Experian). If your business has a valid DUNS number and good standing, we can usually approve a credit line of up to $50,000 within 24 hours.",
  },
  {
    question: "Is there a Minimum Order Quantity (MOQ)?",
    answer:
      "We focus on corporate procurement. Our order minimum is $500. This strict threshold allows us to keep our unit prices significantly lower than retail distributors like Amazon or Best Buy.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. We ship to over 80 countries via DHL Express or FedEx International Priority. For orders over 500 units, we also support EXW (Ex Works) terms if you prefer to use your own freight forwarder.",
  },
  {
    question: "Are these devices brand new?",
    answer:
      "Yes. Unless explicitly marked as 'Refurbished' or 'Open Box' in the catalog, all inventory is Factory Sealed, Brand New, and comes with the original Manufacturer Warranty valid in your region.",
  },
];

export function RiskReversalFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* LEFT: The Hook */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6 text-foreground">
              Procurement without the{" "}
              <span className="text-primary">Panic.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Your biggest fear is getting stuck with bad inventory or a vendor
              who ghosts you. We built our policies to eliminate that risk.
            </p>

            <div className="p-6 bg-muted/40 rounded-xl border border-dashed border-border">
              <h3 className="font-semibold mb-2 text-foreground">
                Still have questions?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our procurement specialists are available 9am-6pm EST.
              </p>
              <div className="font-mono text-lg font-bold text-primary">
                +1 (800) 555-0199
              </div>
            </div>
          </div>

          {/* RIGHT: The Accordion */}
          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={cn(
                    "border rounded-lg transition-all duration-200",
                    isOpen
                      ? "bg-card shadow-sm border-primary/20"
                      : "bg-transparent hover:bg-muted/30 border-border",
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex items-center justify-between w-full p-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={cn(
                        "font-medium",
                        isOpen ? "text-primary" : "text-foreground",
                      )}
                    >
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="p-4 pt-0 text-muted-foreground text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
