"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function PrintQuoteButton() {
  const handlePrint = () => {
    // Open the dedicated print route in a new window to keep context
    const width = 800;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      "/print/cart",
      "PrintQuote",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );
  };

  return (
    <Button variant="outline" onClick={handlePrint} className="w-full gap-2">
      <Printer className="h-4 w-4" />
      Print Quote
    </Button>
  );
}
