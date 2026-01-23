import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";

// check login must
const LoginPage = () => {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-background">
      {/* hidden on mobile, left */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r border-border">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src="/images/backgrounds/mesh.jpg"
            alt="Secure Server Background"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            preload={true}
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
        </div>
        {/* Logo Area */}
        <div className="relative z-10 flex items-center text-lg font-medium">
          <div className="w-8 h-8 bg-white rounded-md mr-2 flex items-center justify-center">
            {/* Simple logo shape */}
            <div className="w-4 h-4 bg-black rounded-sm transform rotate-45" />
          </div>
          <span className="font-bold tracking-tight">Scala Industries</span>
        </div>

        {/* Testimonial / Trust Badge */}
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg font-light italic text-gray-200">
              &ldquo;The ability to see live inventory across both warehouses
              changed our supply chain. We moved 100% of our cabling procurement
              to Scala.&rdquo;
            </p>
            <footer className="text-sm font-semibold text-gray-400">
              — Director of Logistics,{" "}
              <span className="text-white">Apex Manufacturing</span>
            </footer>
          </blockquote>

          <div className="mt-8 flex gap-4 opacity-50 grayscale hover:opacity-80 transition-opacity">
            {/* Tiny Brand Logos for "Trust" */}
            <div className="h-6 w-20 bg-white/20 rounded"></div>
            <div className="h-6 w-20 bg-white/20 rounded"></div>
            <div className="h-6 w-20 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>

      {/* right: The Form */}
      <div className="lg:p-8 h-full flex items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-87.5">
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="lg:hidden flex justify-center mb-4">
            <div className="w-10 h-10 bg-foreground rounded-md flex items-center justify-center">
              <div className="w-5 h-5 bg-background rounded-sm transform rotate-45" />
            </div>
          </div>

          <LoginForm />

          {/* Footer Links */}
          <p className="px-8 text-center text-xs text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              prefetch={false}
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              prefetch={false}
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
