"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "./UserDropdown";

interface NavbarActionsProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  } | null;
}

export function NavbarActions({ user: initialUser }: NavbarActionsProps) {
  const [user, setUser] = useState(initialUser);

  // Keep in sync if the server sends a new user (e.g. after login)
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  // If user exists, show Dropdown
  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="hidden sm:block">
          <Button variant="secondary" size="sm">
            Go to Dashboard
          </Button>
        </Link>
        {/* Pass the cleanup function to hide UI immediately */}
        <UserDropdown user={user} onLogout={() => setUser(null)} />
      </div>
    );
  }

  // Otherwise, show Login Buttons
  return (
    <div className="flex items-center gap-2">
      <Link href="/login">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </Link>
      <Link href="/login?tab=register">
        <Button size="sm">Get Started</Button>
      </Link>
    </div>
  );
}
