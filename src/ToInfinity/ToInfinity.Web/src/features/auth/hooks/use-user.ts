import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/get-user";
import type { User } from "../types";

export const useUser = () => {
  return useQuery<User | null>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
