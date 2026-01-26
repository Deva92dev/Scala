import { PrintCartContent } from "@/components/home/PrintCartContent";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export const metadata = {
  title: "Print Quote - Scala B2B",
};

export default function PrintCartPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-white">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      }
    >
      <PrintCartContent />
    </Suspense>
  );
}
