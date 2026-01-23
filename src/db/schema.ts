import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  decimal,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

// npx drizzle-kit push after any change
// Idempotency table so that double order does not happen

export const roleEnum = pgEnum("role", [
  "admin",
  "buyer",
  "approver",
  "finance",
]);
export const orderStatusEnum = pgEnum("order_status", [
  "pending_approval",
  "approved",
  "rejected",
  "processing",
  "partially_shipped",
  "shipped",
  "delivered",
  "cancelled",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "unpaid",
  "scheduled",
  "paid",
  "overdue", // Net 30 exceeded
  "refunded",
]);

export const paymentTermsEnum = pgEnum("payment_terms", [
  "net_7",
  "net_15",
  "net_30",
  "net_60",
  "due_on_receipt",
  "prepaid",
]);

export const orgTierEnum = pgEnum("org_tier", ["bronze", "silver", "gold"]);

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),

    emailVerified: boolean("email_verified").notNull().default(false),

    image: text("image"),
    activeOrganizationId: text("active_organization_id"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [unique("users_email_unique").on(t.email)],
);

export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    organizationId: text("organization_id"),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("session_user_id_idx").on(table.userId)],
);

export const accounts = pgTable(
  "accounts",
  {
    id: text("id").primaryKey(),
    providerId: text("provider_id").notNull(),
    accountId: text("account_id").notNull(),

    providerAccountId: text("provider_account_id"),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      withTimezone: true,
      mode: "date",
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      withTimezone: true,
      mode: "date",
    }),
    scope: text("scope"),
    passwordHash: text("password_hash"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("account_user_idx").on(t.userId),
    index("account_provider_account_idx").on(t.providerId, t.accountId),
    unique("account_provider_account_unique").on(t.providerId, t.accountId),
  ],
);

export const verifications = pgTable(
  "verifications",
  {
    id: text("id").primaryKey(),
    value: text("value").notNull(),
    identifier: text("identifier").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("verification_identifier_idx").on(t.identifier),
    index("verification_expires_at_idx").on(t.expiresAt),
  ],
);

export const organizations = pgTable(
  "organization",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    logo: text("logo"),
    creditLimit: decimal("credit_limit", { precision: 12, scale: 2 })
      .notNull()
      .default("0.00"),
    usedCredit: decimal("used_credit", { precision: 12, scale: 2 })
      .notNull()
      .default("0.00"),
    paymentTerms: paymentTermsEnum("payment_terms")
      .default("due_on_receipt")
      .notNull(),
    currency: text("currency").default("usd").notNull(),
    version: integer("version").default(0).notNull(),
    tier: orgTierEnum("tier").default("bronze").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    taxIdentifier: text("tax_identifier"),
  },
  (t) => [unique("organization_slug_unique").on(t.slug)],
);

export const members = pgTable(
  "member",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),

    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    role: roleEnum("role").notNull().default("buyer"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("member_org_idx").on(t.organizationId),
    index("member_user_idx").on(t.userId),
    unique("member_org_user_unique").on(t.organizationId, t.userId),
  ],
);

export const auditLogs = pgTable("audit_log", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organizations.id),
  actorUserId: text("actor_user_id")
    .notNull()
    .references(() => users.id),

  action: text("action").notNull(),
  details: jsonb("details"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const organizationAddresses = pgTable("organization_address", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organizations.id),

  label: text("label").notNull(),
  fullAddress: jsonb("full_address").notNull(),
  isDefault: boolean("is_default").default(false),
  contactName: text("contact_name"),
  contactPhone: text("contact_phone"),
});

export const products = pgTable("product", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  isArchived: boolean("is_archived").default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  unitOfMeasure: text("unit_of_measure").default("unit").notNull(),
  minOrderQuantity: integer("min_order_quantity").default(1).notNull(),
});

export const pricingTiers = pgTable(
  "pricing_tier",
  {
    id: bigint("id", { mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    productId: bigint("product_id", { mode: "number" })
      .notNull()
      .references(() => products.id),
    minQuantity: integer("min_quantity").notNull(),
    unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  },
  (t) => [
    index("pricing_product_idx").on(t.productId),
    unique("pricing_product_min_qty_unique").on(t.productId, t.minQuantity),
  ],
);

export const warehouses = pgTable("warehouse", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  address: jsonb("address"),
});

export const inventory = pgTable(
  "inventory",
  {
    productId: bigint("product_id", { mode: "number" })
      .notNull()
      .references(() => products.id),
    warehouseId: uuid("warehouse_id")
      .notNull()
      .references(() => warehouses.id),
    stockOnHand: integer("stock_on_hand").notNull().default(0),
    reservedStock: integer("reserved_stock").notNull().default(0),
    lastUpdated: timestamp("last_updated", { withTimezone: true }).defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.productId, t.warehouseId] })],
);

export const carts = pgTable(
  "cart",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("cart_org_idx").on(t.organizationId),
    index("cart_user_idx").on(t.userId),
    unique("cart_org_user_unique").on(t.organizationId, t.userId),
  ],
);

export const cartItems = pgTable(
  "cart_item",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    cartId: uuid("cart_id")
      .notNull()
      .references(() => carts.id, { onDelete: "cascade" }),
    productId: bigint("product_id", { mode: "number" })
      .notNull()
      .references(() => products.id),
    quantity: integer("quantity").notNull().default(1),
    batchId: text("batch_id"),
    addedAt: timestamp("added_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("cart_item_batch_idx").on(t.batchId),
    index("cart_item_cart_idx").on(t.cartId),
    index("cart_item_product_idx").on(t.productId),
    unique("cart_item_unique").on(t.cartId, t.productId),
  ],
);

export const orders = pgTable(
  "order",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizations.id),
    placedByUserId: text("placed_by_user_id")
      .notNull()
      .references(() => users.id),
    approvedByUserId: text("approved_by_user_id").references(() => users.id),

    approvedAt: timestamp("approved_at", { withTimezone: true }),
    rejectionReason: text("rejection_reason"),
    poNumber: text("po_number"),
    status: orderStatusEnum("status").default("pending_approval").notNull(),
    currency: text("currency").default("USD").notNull(),
    subtotal: decimal("subtotal", { precision: 12, scale: 2 }).notNull(),
    tax: decimal("tax", { precision: 12, scale: 2 }).notNull().default("0"),
    shippingCost: decimal("shipping_cost", { precision: 12, scale: 2 })
      .notNull()
      .default("0"),
    totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
    paymentStatus: paymentStatusEnum("payment_status")
      .default("unpaid")
      .notNull(),
    paymentTerms: text("payment_terms").default("net_30"),
    stripePaymentIntentId: text("stripe_payment_intent_id").unique(),
    shippingAddressSnapshot: jsonb("shipping_address_snapshot").notNull(),
    billingAddressSnapshot: jsonb("billing_address_snapshot").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    invoiceNumber: text("invoice_number").unique(),
  },
  (t) => [index("order_org_created_at_idx").on(t.organizationId, t.createdAt)],
);

export const orderItems = pgTable(
  "order_item",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: bigint("product_id", { mode: "number" })
      .notNull()
      .references(() => products.id),
    quantity: integer("quantity").notNull(),
    fulfilledQuantity: integer("fulfilled_quantity").default(0),
    unitPriceAtPurchase: decimal("unit_price_at_purchase", {
      precision: 10,
      scale: 2,
    }).notNull(),
    totalPrice: decimal("total_price", { precision: 12, scale: 2 }).notNull(),
    productNameSnapshot: text("product_name_snapshot"),
    skuSnapshot: text("sku_snapshot"),
  },
  (t) => [
    index("order_item_order_idx").on(t.orderId),
    index("order_item_product_idx").on(t.productId),
    unique("order_item_unique").on(t.orderId, t.productId),
  ],
);

// RELATIONS
export const organizationsRelations = relations(organizations, ({ many }) => ({
  members: many(members),
  addresses: many(organizationAddresses),
  orders: many(orders),
  auditLogs: many(auditLogs),
}));

export const membersRelations = relations(members, ({ one }) => ({
  user: one(users, {
    fields: [members.userId],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [members.organizationId],
    references: [organizations.id],
  }),
}));

export const pricingTiersRelations = relations(pricingTiers, ({ one }) => ({
  product: one(products, {
    fields: [pricingTiers.productId],
    references: [products.id],
  }),
}));

export const productsRelations = relations(products, ({ many }) => ({
  pricingTiers: many(pricingTiers),
  inventory: many(inventory),
}));

export const inventoryRelations = relations(inventory, ({ one }) => ({
  product: one(products, {
    fields: [inventory.productId],
    references: [products.id],
  }),

  warehouse: one(warehouses, {
    fields: [inventory.warehouseId],
    references: [warehouses.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [orders.organizationId],
    references: [organizations.id],
  }),
  placedByUser: one(users, {
    fields: [orders.placedByUserId],
    references: [users.id],
  }),
  approvedByUser: one(users, {
    fields: [orders.approvedByUserId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const cartsRelations = relations(carts, ({ many }) => ({
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));
