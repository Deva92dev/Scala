import { ValueProps } from "@/components/home/ValueProps";
import { BulkOrder } from "@/components/home/BulkOrder";
import { CatalogTeaser } from "@/components/home/CatalogTeaser";
import { OnboardingRoadmap } from "@/components/home/OnboardingRoadmap";
import { RiskReversalFAQ } from "@/components/home/RiskReversalFAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export function ValueAndDemoGroup() {
  return (
    <>
      <ValueProps />
      <BulkOrder />
    </>
  );
}

export function CatalogAndRoadmapGroup() {
  return (
    <>
      <CatalogTeaser />
      <OnboardingRoadmap />
    </>
  );
}

export function TrustAndFinalGroup() {
  return (
    <>
      <RiskReversalFAQ />
      <FinalCTA />
    </>
  );
}
