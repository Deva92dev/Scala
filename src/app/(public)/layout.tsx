import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";

const Footer = dynamic(
  () => import("@/components/layout/Footer").then((mod) => mod.Footer),
  {
    loading: () => (
      <div className="h-96 bg-background border-t border-border" />
    ),
  },
);

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
