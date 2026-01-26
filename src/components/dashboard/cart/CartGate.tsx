import CartDashboard from "./CartDashboard";
import { requireAuthWithOrg } from "@/db/data-access/users";

const CartGate = async () => {
  const { user, orgId } = await requireAuthWithOrg();
  return <CartDashboard userId={user.id} orgId={orgId} />;
};

export default CartGate;
