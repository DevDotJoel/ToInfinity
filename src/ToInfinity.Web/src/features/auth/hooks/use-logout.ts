import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../../../libs/use-snackbar";
import { queryClient } from "../../../libs/react-query";
import type { MutationConfig } from "../../../libs/react-query";
import { logoutUser } from "../api/logout";

type UseLogoutOptions = {
  config?: MutationConfig<typeof logoutUser>;
};

export const useLogout = ({ config }: UseLogoutOptions = {}) => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    onSuccess: () => {
      // Clear user data and invalidate to trigger refetch
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showSnackbar("Logged out successfully", "info");
    },
    onError: (error: Error) => {
      const message = error && typeof error === 'object' && 'response' in error 
        ? ((error as { response?: { data?: { title?: string } } }).response?.data?.title || "Failed to logout")
        : "Failed to logout";
      showSnackbar(message, "error");
    },
    ...config,
    mutationFn: logoutUser,
  });
};
