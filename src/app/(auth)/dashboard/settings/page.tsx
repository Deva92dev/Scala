import { requireAuthWithOrg } from "@/db/data-access/users";
import { getSettingsData } from "@/db/data-access/settings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Mail, User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const { userId, orgId, role } = await requireAuthWithOrg();
  const { userProfile, orgProfile, teamMembers } = await getSettingsData(
    userId,
    orgId,
  );

  if (!userProfile || !orgProfile) return null;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your personal profile and organization details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* PERSONAL PROFILE CARD */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Personal Profile
            </CardTitle>
            <CardDescription>Your personal login details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userProfile.image || ""} />
                <AvatarFallback>
                  {userProfile.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium text-lg">{userProfile.name}</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="w-3 h-3 mr-1" /> {userProfile.email}
                </div>
                <Badge variant="outline" className="mt-2 capitalize">
                  {role} Role
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ORGANIZATION CARD */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" /> Organization
            </CardTitle>
            <CardDescription>Company details and team members.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">
                Company Name
              </label>
              <p className="text-lg font-medium">{orgProfile.name}</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">
                Team Members
              </label>
              <div className="flex -space-x-2 overflow-hidden">
                {teamMembers.map((member) => (
                  <Avatar
                    key={member.userId}
                    className="inline-block border-2 border-background h-8 w-8"
                  >
                    <AvatarImage src={member.user.image || ""} />
                    <AvatarFallback>
                      {member.user.name?.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {teamMembers.length >= 5 && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-background bg-muted text-[10px] font-medium">
                    +more
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
