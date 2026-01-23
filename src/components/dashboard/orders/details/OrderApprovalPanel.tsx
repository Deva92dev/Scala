/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { approveOrder, rejectOrder } from "@/db/actions/OrderActions";
import { CheckCircle2, XCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  orderId: string;
  orderStatus: string;
  userRole: string;
}

export default function OrderApprovalPanel({
  orderId,
  orderStatus,
  userRole,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const isAdmin = userRole === "admin" || userRole === "owner";
  const isPendingApproval = orderStatus === "pending_approval";

  // Hide if not relevant
  if (!isPendingApproval) return null;

  // Show status banner to non-admins
  if (!isAdmin) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-6">
        <h4 className="font-semibold flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
          </span>
          Awaiting Approval
        </h4>
        <p className="text-sm mt-1">
          This order exceeds your auto-approval limit or requires manager
          review.
        </p>
      </div>
    );
  }

  // Show Controls to Admins
  const handleApprove = () => {
    startTransition(async () => {
      try {
        await approveOrder(orderId);
        toast.success("Order Approved");
      } catch (e) {
        toast.error("Failed to approve");
      }
    });
  };

  const handleReject = () => {
    if (!confirm("Are you sure you want to reject this order?")) return;
    startTransition(async () => {
      await rejectOrder(orderId, "Manual Rejection");
      toast.info("Order Rejected");
    });
  };

  return (
    <Card className="border-primary/20 bg-primary/5 mb-6 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-primary">
          <CheckCircle2 className="w-5 h-5" />
          Approval Required
        </CardTitle>
        <CardDescription>
          Review this order before it is sent to fulfillment.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <Button
          onClick={handleApprove}
          disabled={isPending}
          className="w-full sm:w-auto gap-2"
        >
          Approve Order
        </Button>
        <Button
          onClick={handleReject}
          disabled={isPending}
          variant="destructive"
          className="w-full sm:w-auto gap-2"
        >
          <XCircle className="w-4 h-4" />
          Reject
        </Button>
      </CardContent>
    </Card>
  );
}
