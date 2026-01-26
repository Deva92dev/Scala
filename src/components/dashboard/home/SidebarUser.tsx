import { requireAuthWithOrg } from "@/db/data-access/users";
import { ShieldCheck } from "lucide-react";
import { SidebarSignOut } from "./SidebarSignOut";

export async function SidebarUser() {
  const session = await requireAuthWithOrg();

  return (
    <div className="border-t border-border p-4 bg-muted/10 mt-auto">
      <div className="flex items-center gap-3 mb-4 px-2">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary ring-2 ring-background">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="font-medium text-sm leading-none truncate"
            title={session.name}
          >
            {session.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1 capitalize">
            {session.role}
          </p>
        </div>
      </div>
      <SidebarSignOut />
    </div>
  );
}
