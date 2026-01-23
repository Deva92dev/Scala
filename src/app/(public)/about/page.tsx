import { Building2, Globe2, Trophy, Users2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* HERO SECTION */}
      <section className="py-20 lg:py-32 border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6">
            We are the <span className="text-primary">Infrastructure</span>{" "}
            <br />
            of Modern Commerce.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Buying $50,000 of electronics should be as easy as buying a coffee.
            We are rebuilding the B2B supply chain with code, capital, and
            logistics.
          </p>
        </div>
      </section>

      {/* THE PROBLEM & SOLUTION */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-primary bg-primary/10">
                Our Mission
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Why is wholesale still stuck in 1990?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Before TechCorp, procurement teams spent 40% of their week on
                emails, PDF invoices, and chasing tracking numbers.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We replaced the fax machine with a Dashboard. We replaced Net-30
                maybe with Net-60 instant. We turned a chaotic supply chain into
                a clean API.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-4 border-primary pl-4">
                  <div className="text-3xl font-bold">10M+</div>
                  <div className="text-sm text-muted-foreground">
                    Units Shipped
                  </div>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <div className="text-3xl font-bold">99.8%</div>
                  <div className="text-sm text-muted-foreground">
                    On-Time Rate
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Abstract */}
            <div className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-2xl p-8 relative overflow-hidden grid grid-cols-2 gap-4">
              <div className="bg-background rounded-xl shadow-sm p-6 flex flex-col justify-center items-center text-center">
                <Globe2 className="w-8 h-8 text-blue-500 mb-3" />
                <span className="font-bold">Global Scale</span>
              </div>
              <div className="bg-background rounded-xl shadow-sm p-6 flex flex-col justify-center items-center text-center mt-8">
                <Building2 className="w-8 h-8 text-purple-500 mb-3" />
                <span className="font-bold">Warehousing</span>
              </div>
              <div className="bg-background rounded-xl shadow-sm p-6 flex flex-col justify-center items-center text-center -mt-8">
                <Users2 className="w-8 h-8 text-green-500 mb-3" />
                <span className="font-bold">Relationships</span>
              </div>
              <div className="bg-background rounded-xl shadow-sm p-6 flex flex-col justify-center items-center text-center">
                <Trophy className="w-8 h-8 text-yellow-500 mb-3" />
                <span className="font-bold">Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground text-background text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Ready to upgrade your supply chain?
          </h2>
          <Link href="/login?intent=credit_application">
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 h-14 px-8 text-lg"
            >
              Partner With Us <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
