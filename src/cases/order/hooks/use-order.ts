import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderService } from "../services/order.service";
import type { OrderDTO } from "../dtos/order.dto";

export function useOrders(customerId?: string) {
  return useQuery<OrderDTO[]>({
    queryKey: ["orders", customerId],
    queryFn: () => OrderService.list(customerId),
    enabled: !!customerId,
    refetchOnWindowFocus: false,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<OrderDTO, Error, Omit<OrderDTO, "id">>({
    mutationFn: (order) => OrderService.create(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
