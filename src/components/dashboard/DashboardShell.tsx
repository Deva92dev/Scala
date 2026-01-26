interface Props {
  user: { name: string; role: string; userId: string; orgId: string };
  initialCartCount: number;
  children: React.ReactNode;
}

export function DashboardShell({ children }: Props) {
  return (
    <div className="flex bg-muted">
      <div className="md:pl-64 flex flex-col w-full">
        <main className="flex-1 p-8 w-full">{children}</main>
      </div>
    </div>
  );
}
