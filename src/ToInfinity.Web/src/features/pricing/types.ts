export interface PricingPlanExtras {
  label: string;
  price: string;
  note: string;
}

export interface PricingPlan {
  id: string;
  number?: number;
  name: string;
  price: string;
  bestFor: string[];
  features: string[];
  cta: string;
  highlighted: boolean;
  extras: PricingPlanExtras | null;
}

export interface TrustItem {
  title: string;
  description: string;
}
