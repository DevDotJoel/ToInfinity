import type { QuoteRequest } from "../../lib/data";

export const calculateQuoteCounts = (quotes: QuoteRequest[]) => {
  return {
    total: quotes.length,
    pending: quotes.filter((q) => q.status === "pending").length,
    replied: quotes.filter((q) => q.status === "replied").length,
    accepted: quotes.filter((q) => q.status === "accepted").length,
    declined: quotes.filter((q) => q.status === "declined").length,
  };
};

export const getRecentQuotes = (quotes: QuoteRequest[], limit: number = 4) => {
  return quotes.slice(0, limit);
};
