import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../../libs/use-snackbar";
import { queryClient } from "../../../libs/react-query";
import type { MutationConfig } from "../../../libs/react-query";
import { logoutUser } from "../api/logout";

type UseLogoutOptions = {
  config?: MutationConfig<typeof logoutUser>;
};

export const useLogout = ({ config }: UseLogoutOptions = {}) => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.clear();
      navigate("/auth/signin");
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
