import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "./api";
import type { MutationConfig } from "../../libs/react-query";

type UseCreateCheckoutSessionOptions = {
  mutationConfig?: MutationConfig<typeof createCheckoutSession>;
};

export const useCreateCheckoutSession = ({
  mutationConfig,
}: UseCreateCheckoutSessionOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (data, ...args) => {
      window.location.href = data.checkoutUrl;
      onSuccess?.(data, ...args);
    },
    ...restConfig,
  });
};
