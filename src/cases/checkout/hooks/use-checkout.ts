import { useMutation } from "@tanstack/react-query";
import { checkoutService, type CheckoutPayload } from "../services/checkout.service";

export function useCheckout() {
  return useMutation({
    mutationFn: (data: CheckoutPayload) => checkoutService(data)
  });
}
