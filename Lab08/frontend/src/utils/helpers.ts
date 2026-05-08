export type Page = "home" | "detail" | "cart" | "success";

export const USER_ID = "user1";

export function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + " ₫";
}
