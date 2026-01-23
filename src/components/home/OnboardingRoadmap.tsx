import { UserPlus, FileCheck, Zap, Truck } from "lucide-react";

const STEPS = [
  {
    title: "Create Account",
    description: "Sign up in 2 minutes. No credit card required to start.",
    icon: UserPlus,
    time: "2 Mins",
  },
  {
    title: "Verify Business",
    description:
      "Upload your Reseller Certificate or Tax ID for tax-exempt status.",
    icon: FileCheck,
    time: "Instant",
  },
  {
    title: "Get Credit Limit",
    description:
      "Our automated system reviews your D&B score for Net-60 terms.",
    icon: Zap,
    time: "< 24 Hours",
  },
  {
    title: "Start Ordering",
    description: "Unlock wholesale pricing and ship via Freight or FedEx.",
    icon: Truck,
    time: "Same Day",
  },
];

export function OnboardingRoadmap() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">
            From Application to <span className="text-primary">Shipment</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We have automated the manual parts of procurement. Get approved
            faster than you can write a check.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-[linear-gradient(to_right,transparent,var(--color-border),transparent)] w-3/4 mx-auto -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center group"
              >
                {/* STEP NUMBER (Mobile Only) */}
                <div className="lg:hidden absolute -top-8 left-1/2 -translate-x-1/2 text-6xl font-black text-muted/50 -z-10">
                  {index + 1}
                </div>

                {/* ICON CIRCLE */}
                <div className="w-24 h-24 rounded-full bg-background border-4 border-muted shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/20 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <step.icon className="w-8 h-8" />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-bold text-secondary-foreground mb-2">
                    {step.time}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-62.5 mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
