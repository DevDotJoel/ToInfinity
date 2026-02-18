import { api } from "../../libs/api-client";

interface CreateCheckoutSessionResponse {
  checkoutUrl: string;
}

export const createCheckoutSession = (
  planType: string
): Promise<CreateCheckoutSessionResponse> => {
  return api.post("/api/subscriptions/checkout", { planType });
};
