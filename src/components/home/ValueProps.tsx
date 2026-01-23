import { Banknote, Truck, Users, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: Banknote,
    title: "Buy Now, Pay Later",
    description:
      "Get up to $50,000 in instant credit with Net-60 terms. 0% interest if paid within 30 days. No more using personal cards for company orders.",
  },
  {
    icon: Truck,
    title: "Real-Time Inventory",
    description:
      "If you see it, it ships today. We sync directly with our warehouse WMS. No 'Backorder' surprises after you've already paid.",
  },
  {
    icon: Users,
    title: "Dedicated Account Manager",
    description:
      "No chatbots. No support tickets. You get a direct WhatsApp/Phone line to a human who knows your procurement history.",
  },
];

export function ValueProps() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-foreground">
            Built for the{" "}
            <span className="text-primary">Modern Procurement Team</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We stripped away the friction of traditional wholesale. No fax
            machines, no Call for Price, no waiting.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-card-foreground">
                {feature.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {feature.description}
              </p>

              <div className="flex items-center text-sm font-semibold text-primary cursor-pointer group">
                Learn more{" "}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
