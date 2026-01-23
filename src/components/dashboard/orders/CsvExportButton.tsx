"use client";

import { Button } from "@/components/ui/button";
import { downloadOrdersCSV } from "@/db/actions/CsvActions";
import { Download, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

const CsvExportButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleExport = () => {
    startTransition(async () => {
      try {
        const { csv, filename } = await downloadOrdersCSV();

        // trigger browser download
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Export Downloaded");
      } catch (error) {
        console.error(`error at ${error}`);
        toast.error("Failed to export CSV");
      }
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Download className="mr-2 h-4 w-4" />
      )}
      Export CSV
    </Button>
  );
};

export default CsvExportButton;
