import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale Electronics Procurement",
  description:
    "Join 5,000+ businesses saving 18% on IT procurement. Apply for Net-60 terms and access Tier-1 pricing on Apple, Dell, and Lenovo.",
};

const ValueAndDemoGroup = dynamic(
  () =>
    import("@/components/home/HomeGroups").then((mod) => mod.ValueAndDemoGroup),
  { loading: () => <div className="min-h-[50vh] bg-background" /> },
);

const CatalogAndRoadmapGroup = dynamic(
  () =>
    import("@/components/home/HomeGroups").then(
      (mod) => mod.CatalogAndRoadmapGroup,
    ),
  { loading: () => <div className="min-h-[50vh] bg-background" /> },
);

const TrustAndFinalGroup = dynamic(
  () =>
    import("@/components/home/HomeGroups").then(
      (mod) => mod.TrustAndFinalGroup,
    ),
  { loading: () => <div className="min-h-[30vh] bg-background" /> },
);

export default function Home() {
  return (
    <main className="font-sans dark:bg-black">
      <HeroSection />
      <TrustBar />
      <ValueAndDemoGroup />
      <CatalogAndRoadmapGroup />
      <TrustAndFinalGroup />
    </main>
  );
}
