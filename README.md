#### Schema Related

## unique vs indexes

❌ Don’t index columns that:
Are rarely filtered
Are frequently updated
Have very low cardinality
Are mostly used in inserts

B-tree indexes can only be entered from their leftmost column.
Index column order defines which questions are cheap to ask

UNIQUE is an index, and fetches data at the same speed for the access paths it covers.
Use UNIQUE to protect truth.
Use INDEX to optimize access paths that truth doesn’t cover.

Indexes optimize access; constraints protect truth
This distinction is non-negotiable.

Feature Index Unique constraint
Speeds queries ✅ ✅
Prevents duplicates ❌ ✅
Enforces invariants ❌ ✅
Creates an index — ✅
Can lie about intent ✅ ❌

When you were relying on indexes to imply uniqueness, you were trusting discipline instead of enforcement.
Databases punish that assumption.

The real rule (this is the one to remember)

UNIQUE guarantees correctness.
INDEX guarantees speed for a specific access pattern.
UNIQUE already gives you an index — but only for its column order.

So the correct design process is:
Add UNIQUE constraints for invariants
Observe query patterns
Add indexes only when a query path is not covered

Not the other way around.

Every extra index:
Slows inserts
Slows updates
Increases WAL writes
Increases memory pressure
Makes migrations slower
Indexes are not free.

# example

cart_item

You want:
One product per cart → invariant
Fast lookup by cart → query
Correct setup:
unique(cartId, productId) // correctness + cart lookups

Do you also need:
index(productId)
Only if you run queries like:
“Find all carts containing product X”
Analytics / admin tools

If not → don’t add it.

# What “column order” actually means

The index is sorted first by order_id,
and only then by product_id within each order_id.
That ordering is the entire point of column order means.

(order_id = 1, product_id = 10)
(order_id = 1, product_id = 15)
(order_id = 1, product_id = 20)
(order_id = 2, product_id = 5)
(order_id = 2, product_id = 9)
(order_id = 3, product_id = 1)
