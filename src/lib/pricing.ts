export const FREE_SHIPPING_THRESHOLD = 3000;
export const SHIPPING_FEE = 120;

export const formatBDT = (n: number) => `৳${n.toLocaleString("en-IN")}`;

export function shippingFor(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}
