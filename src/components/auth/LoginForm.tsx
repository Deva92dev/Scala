"use client";

import Link from "next/link";
import { useReducer, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authReducer, initialState } from "@/hooks/reducer/AuthReducer";
import { emailSchema } from "@/lib/ZodSchemas";
import { signIn } from "@/lib/auth-client";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // validation
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      const errorMessage = validation.error.message;
      dispatch({ type: "ERROR", payload: errorMessage });
      toast.error(errorMessage);
    }

    // submit
    dispatch({ type: "SUBMIT" });

    await signIn.magicLink(
      {
        email: email,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {}, // handles by dispatch above
        onSuccess: () => {
          dispatch({ type: "SUCCESS" });
          toast.success("magic link sent, Check your inbox");
        },
        onError: (ctx) => {
          dispatch({ type: "ERROR", payload: ctx.error.message });
          toast.error(ctx.error.message);
        },
      }
    );
  };

  // social login
  const handleSocialLogin = async (provider: "google" | "microsoft") => {
    dispatch({ type: "SUBMIT" });

    await signIn.social(
      {
        provider: provider,
        callbackURL: "/dashboard",
      },
      {
        onError: (ctx) => {
          dispatch({ type: "ERROR", payload: ctx.error.message });
          toast.error(ctx.error.message);
        },
      }
    );
  };

  // Success State (Early Return)
  if (state.status === "success") {
    return (
      <div className="w-full max-w-sm space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-green-100 rounded flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight">Check your inbox</h2>
        <p className="text-muted-foreground">
          We sent a secure login link to{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>
        <Button
          variant="outline"
          onClick={() => dispatch({ type: "RESET" })}
          className="mt-4 w-full"
        >
          Use a different email
        </Button>
      </div>
    );
  }

  // Form State
  const isLoading = state.status === "loading";

  return (
    <div className="w-full max-w-sm space-y-8">
      {/* header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl tracking-tight text-foreground font-bold">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground">
          Secure portal access for authorized procurement officers.
        </p>
      </div>

      {/* Inline Error Alert */}
      {state.status === "error" && state.error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <form onSubmit={handleLinkLogin} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs uppercase font-bold text-muted-foreground tracking-wider"
            >
              Work Email
            </Label>
            <div className="relative group">
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                disabled={isLoading}
                className="pl-10 h-11 bg-background border-input focus:ring-2 focus:ring-ring transition-all"
                onChange={(e) => {
                  setEmail(e.target.value);
                  // clear error when user starts typing again
                  if (state.status === "error") dispatch({ type: "RESET" });
                }}
              />
            </div>
          </div>
        </div>

        <Button
          className="w-full h-11 font-medium text-md"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Lock className="mr-2 h-4 w-4" />
          )}
          Send Magic Link
        </Button>
      </form>

      {/* DIVIDER */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or Connect with SSO
          </span>
        </div>
      </div>

      {/* sso buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-11 border-border hover:bg-secondary/50"
          disabled={isLoading}
          onClick={() => handleSocialLogin("google")}
          type="button"
        >
          {/* Google Icon */}
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C.79 9.81 0 12 0 12s.79 4.19 2.18 6.95l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google Workspace
        </Button>
        <Button
          variant="outline"
          className="h-11 border-border hover:bg-secondary/50"
          disabled={isLoading}
          onClick={() => handleSocialLogin("microsoft")}
          type="button"
        >
          {/* Microsoft Icon */}
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 23 23">
            <path fill="#f3f3f3" d="M0 0h23v23H0z" />
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
          Microsoft 365
        </Button>
      </div>

      {/* footer */}
      <p className="px-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an organization ID?{" "}
        <Link
          href="/contact"
          prefetch={false}
          className="underline underline-offset-4 hover:text-primary font-medium"
        >
          Apply for access
        </Link>
      </p>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4 opacity-75">
        <ShieldCheck className="w-3 h-3" />
        <span>256-bit SSL Encrypted Connection</span>
      </div>
    </div>
  );
};

export default LoginForm;
