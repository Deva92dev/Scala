import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { StatementShell } from "@/components/shared/StatementShell";

interface PageProps {
  searchParams: Promise<{ month?: string; year?: string }>;
}

async function StatementContent({ searchParams }: PageProps) {
  const params = await searchParams;

  const now = new Date();
  const month = params.month ? parseInt(params.month) - 1 : now.getMonth();
  const year = params.year ? parseInt(params.year) : now.getFullYear();

  return <StatementShell month={month} year={year} />;
}

export default function PrintStatementPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      }
    >
      <StatementContent searchParams={props.searchParams} />
    </Suspense>
  );
}
