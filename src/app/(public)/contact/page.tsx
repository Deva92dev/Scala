import {
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* HEADER */}
      <section className="py-16 border-b bg-slate-50 dark:bg-slate-900/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Contact Support
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We don not hide behind chatbots. Reach our San Francisco team
            directly.
            <br />
            <span className="font-medium text-primary">
              Average response time: &lt; 2 hours.
            </span>
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12 grid lg:grid-cols-3 gap-12">
        {/* LEFT: DIRECT INFO */}
        <div className="lg:col-span-1 space-y-8">
          {/* Card 1: Main HQ */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Corporate HQ
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                123 Tech Blvd, Suite 400
                <br />
                San Francisco, CA 94107
                <br />
                United States
              </p>
            </CardContent>
          </Card>

          {/* Card 2: Departments */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border rounded-lg bg-card">
              <Phone className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-sm">Sales & Wholesale</h3>
                <p className="text-sm text-muted-foreground">
                  +1 (800) 555-0199
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Mon-Fri, 9am - 6pm EST
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-lg bg-card">
              <Mail className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-sm">Order Support</h3>
                <p className="text-sm text-muted-foreground">
                  support@techcorp.com
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  24/7 Monitoring
                </p>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex gap-4 text-xs text-muted-foreground pt-4">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Secure Data
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> Priority SLA
            </div>
          </div>
        </div>

        {/* RIGHT: CONTACT FORM */}
        <div className="lg:col-span-2">
          <Card className="border-2 shadow-lg">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Business Email
                    </label>
                    <Input placeholder="john@company.com" type="email" />
                  </div>
                </div>

                <div className="space-y-2">
                  {/* 1. Add htmlFor matching the ID below */}
                  <label
                    htmlFor="contact-topic"
                    className="text-sm font-medium"
                  >
                    Topic
                  </label>

                  <select
                    id="contact-topic"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option>General Inquiry</option>
                    <option>Wholesale Application Status</option>
                    <option>Order Issue (Returns/Damages)</option>
                    <option>Technical Support</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    className="min-h-37.5"
                    placeholder="How can we help you today? Please include Order ID if applicable."
                  />
                </div>

                <div className="pt-2">
                  <Button size="lg" className="w-full md:w-auto h-12 px-8">
                    <MessageSquare className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
