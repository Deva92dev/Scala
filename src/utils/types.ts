import { InferSelectModel } from "drizzle-orm";
import { orderItems, orders, products } from "@/db/schema";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  activeOrganizationId: string | null;
};

type Order = InferSelectModel<typeof orders>;
type OrderItem = InferSelectModel<typeof orderItems>;
type Product = InferSelectModel<typeof products>;

export interface AddressSnapshot {
  street: string;
  city: string;
  state?: string;
  zip: string;
  country: string;
}

export interface OrderDetailsDTO extends Order {
  shippingAddressSnapshot: AddressSnapshot | null;
  billingAddressSnapshot: AddressSnapshot | null;

  // Relations
  items: (OrderItem & {
    product: Product | null; // Product might be deleted, so nullable
  })[];

  placedByUser?: {
    name: string | null;
    email: string;
  } | null;
}
