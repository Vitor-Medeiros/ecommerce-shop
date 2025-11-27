import { api } from "@/lib/axios";

export type CheckoutPayload = {
  items: {
    productId: number;
    quantity: number;
  }[];
};

export async function checkoutService(payload: CheckoutPayload) {
  const response = await api.post("/checkout", payload);
  return response.data;
}
