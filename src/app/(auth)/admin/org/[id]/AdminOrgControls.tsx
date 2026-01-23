/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateOrgFinancials } from "@/db/actions/SuperAdminActions";
import { Loader2, Medal, Save, TrendingUp } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  orgId: string;
  currentLimit: number;
  currentTerms: string;
  currentTier: "bronze" | "silver" | "gold";
}

const TIER_OPTIONS = [
  { value: "bronze", label: "Bronze (Standard)", color: "text-orange-700" },
  { value: "silver", label: "Silver (Preferred)", color: "text-slate-500" },
  { value: "gold", label: "Gold (VIP)", color: "text-yellow-500" },
];

export default function AdminOrgControls({
  orgId,
  currentLimit,
  currentTerms,
  currentTier,
}: Props) {
  const [limit, setLimit] = useState(currentLimit);
  const [terms, setTerms] = useState(currentTerms);
  const [tier, setTier] = useState(currentTier);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateOrgFinancials(orgId, limit, terms, tier);
        toast.success("Organization updated successfully");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to update organization");
      }
    });
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Account Management</CardTitle>
          {/* Visual Indicator of Current Status */}
          <div className="flex items-center gap-2 text-sm font-medium bg-secondary px-3 py-1 rounded-full capitalize">
            <Medal
              className={`w-4 h-4 ${
                tier === "gold"
                  ? "text-yellow-500"
                  : tier === "silver"
                    ? "text-slate-400"
                    : "text-orange-700"
              }`}
            />
            {tier} Tier
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 1. TIER SELECTION (The "Promote" Action) */}
          <div className="grid gap-2 border p-4 rounded-lg bg-slate-50">
            <Label className="flex items-center gap-2">
              Organization Tier{" "}
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </Label>
            <Select value={tier} onValueChange={(val: any) => setTier(val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIER_OPTIONS.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    <span className={t.color}>{t.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Promoting to Gold signals VIP status. (Future: Can trigger
              auto-discounts).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 2. Credit Limit */}
            <div className="grid gap-2">
              <Label>Credit Limit (USD)</Label>
              <Input
                type="number"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              />
            </div>

            {/* 3. Payment Terms */}
            <div className="grid gap-2">
              <Label>Payment Terms</Label>
              <Select value={terms} onValueChange={setTerms}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prepaid">Prepaid (Card Only)</SelectItem>
                  <SelectItem value="net_30">Net 30</SelectItem>
                  <SelectItem value="net_60">Net 60</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <Save className="mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
