import DashboardGate from "@/components/dashboard/DashboardGate";
import { SettingsContent } from "@/components/dashboard/SettingsContent";
import { SettingsSkeleton } from "@/components/Skeletons/SettingsSkeleton";
import { Suspense } from "react";

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsSkeleton />}>
      <DashboardGate>
        {(ctx) => (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Account Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your personal profile and organization details.
              </p>
            </div>

            <SettingsContent
              orgId={ctx.orgId}
              role={ctx.role}
              userId={ctx.userId}
            />
          </div>
        )}
      </DashboardGate>
    </Suspense>
  );
}
