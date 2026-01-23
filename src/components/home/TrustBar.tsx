import { Apple, Smartphone, Laptop, Monitor, Speaker } from "lucide-react";

// In production, replace these Lucide Icons with real SVG logos

const BRANDS = [
  { name: "Apple Authorized", icon: Apple },
  { name: "Samsung Partner", icon: Smartphone },
  { name: "Dell Enterprise", icon: Laptop },
  { name: "HP Business", icon: Monitor },
  { name: "Lenovo Pro", icon: Speaker },
];

export function TrustBar() {
  return (
    <section className="border-b bg-muted/30 py-10 slide-in-from-bottom-2.5">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wider">
          Authorized Distributor For
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center gap-2 group cursor-default text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <brand.icon className="h-8 w-8" />
              <span className="text-lg font-bold">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
