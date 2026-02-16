import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../../../libs/use-snackbar";
import type { MutationConfig } from "../../../libs/react-query";
import { registerUser } from "../api/register";

type UseRegisterOptions = {
  config?: MutationConfig<typeof registerUser>;
};

export const useRegister = ({ config }: UseRegisterOptions = {}) => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    onSuccess: (data) => {
      showSnackbar(data.message || "Account created successfully!", "success");
    },
    onError: (error: Error) => {
      const message = error && typeof error === 'object' && 'response' in error 
        ? ((error as { response?: { data?: { title?: string } } }).response?.data?.title || "Failed to create account")
        : "Failed to create account";
      showSnackbar(message, "error");
    },
    ...config,
    mutationFn: registerUser,
  });
};
