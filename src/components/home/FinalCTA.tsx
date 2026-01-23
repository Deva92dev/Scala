import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-background">
          Stop overpaying for retail.
        </h2>
        <p className="text-xl text-background max-w-2xl mx-auto mb-10 opacity-90">
          Join 5,000+ businesses saving an average of 18% on electronics
          procurement. Your credit limit is waiting.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/login?tab=register&intent=credit_application">
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-background text-foreground hover:bg-background/90 shadow-xl"
            >
              Get My Credit Limit <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="/catalog" aria-label="View the full electronics catalog">
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg border-background/20 text-background hover:bg-background/10 hover:text-background bg-transparent"
            >
              View Catalog
            </Button>
          </Link>
        </div>
        <p className="mt-8 text-xs text-background uppercase tracking-widest opacity-80">
          No Commitment • Instant Approval • Net-60 Terms
        </p>
      </div>
    </section>
  );
}
