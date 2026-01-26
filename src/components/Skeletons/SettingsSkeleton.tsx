export function SettingsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 animate-pulse">
      <div className="rounded-xl border bg-card p-6 h-64">
        <div className="h-6 w-32 bg-muted rounded mb-2" />
        <div className="h-4 w-48 bg-muted/50 rounded mb-6" />
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="h-5 w-32 bg-muted rounded" />
            <div className="h-4 w-40 bg-muted/50 rounded" />
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6 h-64">
        <div className="h-6 w-32 bg-muted rounded mb-2" />
        <div className="h-4 w-48 bg-muted/50 rounded mb-6" />
        <div className="space-y-4">
          <div className="h-10 w-full bg-muted/30 rounded" />
          <div className="h-10 w-full bg-muted/30 rounded" />
        </div>
      </div>
    </div>
  );
}
