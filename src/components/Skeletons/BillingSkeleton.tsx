export function BillingSkeleton() {
  return (
    <div className="space-y-8 max-w-5xl animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="h-4 w-64 bg-muted/50 rounded" />
      </div>
      <div className="h-48 bg-muted border border-l-4 rounded-xl" />
      <div className="h-64 bg-muted border rounded-xl" />
    </div>
  );
}

export default function AdminLoading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-slate-400">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-r-transparent" />
        <p className="text-sm font-medium">Verifying Privileges...</p>
      </div>
    </div>
  );
}
