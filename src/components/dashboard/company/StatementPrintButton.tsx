"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function StatementPrintButton() {
  const handlePrint = () => {
    const now = new Date();

    const url = `/print/statement?month=${
      now.getMonth() + 1
    }&year=${now.getFullYear()}`;
    window.open(url, "StatementPrint", "width=900,height=800,resizable=yes");
  };

  return (
    <Button variant="outline" onClick={handlePrint} className="gap-2">
      <Printer className="w-4 h-4" />
      Print Statement
    </Button>
  );
}
