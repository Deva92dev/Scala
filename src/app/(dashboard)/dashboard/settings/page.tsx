import { SettingsContent } from "@/components/dashboard/SettingsContent";
import { SettingsSkeleton } from "@/components/Skeletons/SettingsSkeleton";
import { requireAuthWithOrg } from "@/db/data-access/users";
import { Suspense } from "react";

async function SettingsPageContent() {
  const session = await requireAuthWithOrg();

  return (
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
        orgId={session.orgId}
        role={session.role}
        userId={session.userId}
      />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsSkeleton />}>
      <SettingsPageContent />
    </Suspense>
  );
}
