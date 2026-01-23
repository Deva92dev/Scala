"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Check, FileSpreadsheet, ArrowRight, Loader2 } from "lucide-react";

const DEMO_DATA = [
  { sku: "MAC-M3-PRO", name: "MacBook Pro 16 M3", qty: 5, status: "In Stock" },
  { sku: "DELL-XPS-15", name: "Dell XPS 15 9530", qty: 12, status: "In Stock" },
  {
    sku: "IPHONE-15-PM",
    name: "iPhone 15 Pro Max",
    qty: 20,
    status: "Low Stock",
  },
  { sku: "SAM-S24-ULT", name: "Samsung S24 Ultra", qty: 8, status: "In Stock" },
];

const CSV_TEXT = `MAC-M3-PRO, 5\nDELL-XPS-15, 12\nIPHONE-15-PM, 20\nSAM-S24-ULT, 8`;

export function BulkOrder() {
  const [step, setStep] = useState<"idle" | "typing" | "processing" | "done">(
    "idle",
  );
  const [text, setText] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const runAnimation = () => {
      setStep("idle");
      setText("");
      timeout = setTimeout(() => {
        setStep("typing");
        let i = 0;
        const typeInterval = setInterval(() => {
          setText(CSV_TEXT.slice(0, i));
          i++;
          if (i > CSV_TEXT.length) {
            clearInterval(typeInterval);
            setStep("processing");
            setTimeout(() => {
              setStep("done");
              setTimeout(runAnimation, 4000);
            }, 800);
          }
        }, 30);
      }, 1000);
    };
    runAnimation();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: The Pitch */}
          <div>
            <div className="inline-flex items-center rounded-full border border-border px-3 py-1 text-sm font-medium text-primary bg-primary/10 mb-6">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Quick Order Tool
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-foreground">
              Don&apos;t click &quot;Add to Cart&quot; <br />
              <span className="text-primary">50 times</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Have a PO from your procurement software? Just copy the SKU list
              and paste it into our Quick Order tool. We will parse it, check
              stock, and build your cart in seconds.
            </p>

            <div className="space-y-4">
              {[
                "Accepts CSV, Excel, or Text paste",
                "Instant stock validation",
                "One-click export to Invoice",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {/* Semantic Success Colors */}
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: The Coded Animation */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-50" />

            <div className="relative bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
              {/* Header of the Fake App */}
              <div className="border-b border-border bg-muted/50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]" />{" "}
                  <div className="w-3 h-3 rounded-full bg-[#eab308]" />{" "}
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]" />{" "}
                </div>
                <div className="text-xs font-mono text-muted-foreground">
                  Bulk_Import.exe
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* INPUT AREA */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-muted-foreground">
                    Paste SKUs Here
                  </label>
                  <div className="w-full h-32 rounded-md border border-input bg-muted/30 p-3 font-mono text-sm text-foreground relative">
                    {text}
                    {step === "typing" && (
                      <span className="animate-pulse inline-block w-2 h-4 bg-primary ml-1 align-middle" />
                    )}
                    {text.length === 0 && (
                      <span className="text-muted-foreground/50">
                        SKU, Qty...
                      </span>
                    )}
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <div className="flex justify-end">
                  <div
                    className={`px-4 py-2 rounded-md text-sm font-medium text-primary-foreground transition-all duration-300 ${step === "processing" || step === "done" ? "bg-primary/80" : "bg-primary"}`}
                  >
                    {step === "processing" ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Processing
                      </span>
                    ) : step === "done" ? (
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4" /> Complete
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Parse List <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>

                {/* RESULT TABLE */}
                <div
                  className={`border border-border rounded-md overflow-hidden transition-all duration-500 ease-out ${step === "done" ? "opacity-100 max-h-64" : "opacity-0 max-h-0"}`}
                >
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-3 py-2 text-left">Product</th>
                        <th className="px-3 py-2 text-right">Qty</th>
                        <th className="px-3 py-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {DEMO_DATA.map((row) => (
                        <tr key={row.sku} className="bg-card">
                          <td className="px-3 py-2">
                            <div className="font-medium text-foreground">
                              {row.name}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              {row.sku}
                            </div>
                          </td>
                          <td className="px-3 py-2 text-right font-mono text-foreground">
                            {row.qty}
                          </td>
                          <td className="px-3 py-2 text-right">
                            <Badge
                              variant="outline"
                              className="text-[10px] h-5"
                            >
                              {row.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-primary/5 p-2 text-center text-xs text-primary font-medium border-t border-primary/10">
                    All items added to cart successfully.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
