import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface OrderStatusBadgeProps {
  status: string;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const styles: Record<string, string> = {
    pending_approval:
      "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200",
    approved: "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200",
    processing:
      "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200",
    shipped:
      "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-indigo-200",
    delivered:
      "bg-green-100 text-green-800 hover:bg-green-200 border-green-200",
    cancelled: "bg-red-100 text-red-800 hover:bg-red-200 border-red-200",
  };

  const label = status.replace("_", " ");

  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize whitespace-nowrap",
        styles[status] || "bg-gray-100 text-gray-800"
      )}
    >
      {label}
    </Badge>
  );
};

export default OrderStatusBadge;
