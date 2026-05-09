export type Page = "home" | "detail" | "cart" | "success";

export function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + " ₫";
}
