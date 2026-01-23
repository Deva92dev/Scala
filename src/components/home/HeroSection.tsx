import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full border-b bg-background overflow-hidden pt-20 lg:pt-32 pb-20">
      <div className="absolute inset-0 z-0">
        {/* The Infinite Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[24px_24px] mask-[linear-gradient(to_bottom,white_40%,transparent_100%)]"></div>

        {/* Atmospheric Glow */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 h-150 w-150 lg:h-250 lg:w-250 rounded-full bg-primary/10 opacity-40 blur-[80px] lg:blur-[120px]"></div>

        {/* Secondary Ambient Glow */}
        <div className="absolute left-0 top-1/4 -z-10 h-100 w-100 rounded-full bg-secondary/30 opacity-30 blur-[100px]"></div>
      </div>

      {/* CONTENT */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl space-y-6 mb-16">
          {/* Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium text-foreground backdrop-blur-xl">
              <span className="mr-2 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Now accepting Net-60 Applications
            </span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-6xl leading-tight">
            Wholesale Electronics Procurement. <br />
            <span className="text-primary">Solved.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Net-60 terms. Real-time inventory. Bulk tools for serious buyers.
            Stop negotiating with chatbots and start procuring at scale.
          </p>

          {/* Split-Path Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/catalog"
              aria-label="View our full electronics catalog"
            >
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-lg w-full sm:w-auto border-2 bg-background/50 backdrop-blur-sm"
              >
                View Catalog
              </Button>
            </Link>

            <Link
              href="/login?tab=register&intent=credit_application"
              aria-label="Apply for a Net-60 credit account"
            >
              <Button
                size="lg"
                className="h-12 px-8 text-lg w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 transition-all"
              >
                <CreditCard className="w-5 h-5" />
                Apply for Credit
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground pt-4">
            No credit card required for application. Approval in &lt;24h.
          </p>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="relative mx-auto max-w-5xl mt-12 group perspective-[2000px]">
          {/* Glow Effect */}
          <div className="absolute -inset-1 rounded-xl bg-linear-to-r from-primary/20 to-secondary/40 opacity-40 blur-3xl group-hover:opacity-60 transition-opacity duration-500" />

          {/* 3D Tilt Container */}
          <div className="relative rounded-xl border border-border bg-card/50 backdrop-blur-sm p-2 shadow-2xl lg:rounded-2xl lg:p-4 transform transition-transform hover:scale-[1.01] hover:-rotate-x-1 duration-700 ease-out origin-bottom">
            <Image
              src="/images/dashboard-preview.png"
              alt="TechCorp Procurement Dashboard Interface"
              width={1200}
              height={600}
              className="rounded-lg border shadow-sm w-full h-auto"
              preload={true}
            />

            {/* Floating Badge */}
            <div className="absolute -right-6 top-12 hidden lg:block bg-card border border-border p-4 rounded-xl shadow-2xl animate-bounce delay-1000 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Credit Limit
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    $50,000.00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
