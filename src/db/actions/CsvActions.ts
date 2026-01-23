"use server";

import { requireAuthWithOrg } from "@/db/data-access/users";
import { getAllOrdersForExport } from "../data-access/order";
import { format } from "date-fns";

export const downloadOrdersCSV = async () => {
  const { orgId } = await requireAuthWithOrg();
  const orders = await getAllOrdersForExport(orgId);

  const headers = [
    "Order ID",
    "Date",
    "Status",
    "PO Number",
    "Placed By",
    "Product Name",
    "SKU",
    "Quantity",
    "Unit Price",
    "Total Price",
    "Order Total",
  ];

  // Flatten Data: One row per Item
  const rows = orders.flatMap((order) => {
    // If order has no items, return one row with empty item fields
    if (order.items.length === 0) {
      return [
        {
          id: order.id,
          date: format(order.createdAt, "yyyy-MM-dd"),
          status: order.status,
          po: order.poNumber || "N/A",
          user: order.placedByUser.email,
          product: "N/A",
          sku: "N/A",
          qty: 0,
          unit: "0.00",
          total: "0.00",
          orderTotal: order.totalAmount,
        },
      ];
    }

    return order.items.map((item) => ({
      id: order.id,
      date: format(order.createdAt, "yyyy-MM-dd"),
      status: order.status,
      po: order.poNumber || "N/A",
      user: order.placedByUser.email,
      product: item.productNameSnapshot,
      sku: item.skuSnapshot,
      qty: item.quantity,
      unit: item.unitPriceAtPurchase,
      total: item.totalPrice,
      orderTotal: order.totalAmount,
    }));
  });

  // Convert to CSV String
  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      Object.values(row)
        .map((val) => `"${val}"`)
        .join(",")
    ),
  ].join("\n");

  return {
    csv: csvContent,
    filename: `orders-export-${format(new Date(), "yyyy-MM-dd")}.csv`,
  };
};
