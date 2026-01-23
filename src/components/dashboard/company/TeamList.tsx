/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeMember, updateMemberRole } from "@/db/actions/MemberActions";
import { MoreVertical, Shield, Trash, UserCog } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface MemberProps {
  userId: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "buyer";
  isCurrentUser: boolean;
}

export function TeamList({ members }: { members: MemberProps[] }) {
  return (
    <div className="border rounded-lg divide-y bg-card">
      {members.map((member) => (
        <MemberRow key={member.userId} member={member} />
      ))}
    </div>
  );
}

function MemberRow({ member }: { member: MemberProps }) {
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (newRole: "admin" | "buyer") => {
    startTransition(async () => {
      try {
        await updateMemberRole(member.userId, newRole);
        toast.success(`Role updated to ${newRole}`);
      } catch (e) {
        toast.error("Failed to update role");
      }
    });
  };

  const handleRemove = () => {
    if (!confirm(`Remove ${member.name} from organization?`)) return;
    startTransition(async () => {
      try {
        await removeMember(member.userId);
        toast.success("Member removed");
      } catch (e) {
        toast.error("Failed to remove member");
      }
    });
  };

  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>
            {member.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm flex items-center gap-2">
            {member.name}
            {member.role === "admin" || member.role === "owner" ? (
              <Shield className="w-3 h-3 text-blue-600" />
            ) : null}
          </p>
          <p className="text-xs text-muted-foreground">{member.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground capitalize">
          {member.role}
        </span>

        {/* Only show actions if not the current user */}
        {!member.isCurrentUser && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={isPending}>
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleRoleChange("admin")}>
                <UserCog className="w-4 h-4 mr-2" /> Make Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleChange("buyer")}>
                <UserCog className="w-4 h-4 mr-2" /> Make Buyer
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={handleRemove}
              >
                <Trash className="w-4 h-4 mr-2" /> Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
