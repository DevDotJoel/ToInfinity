import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "../../../libs/use-snackbar";
import type { MutationConfig } from "../../../libs/react-query";
import { loginWithEmailAndPassword } from "../api/login";

type UseLoginOptions = {
  config?: MutationConfig<typeof loginWithEmailAndPassword>;
};

export const useLogin = ({ config }: UseLoginOptions = {}) => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    onSuccess: (data) => {
      showSnackbar(data.message || "Signed in successfully!", "success");
    },
    onError: (error: Error) => {
      const message = error && typeof error === 'object' && 'response' in error 
        ? ((error as { response?: { data?: { title?: string } } }).response?.data?.title || "Invalid email or password")
        : "Invalid email or password";
      showSnackbar(message, "error");
    },
    ...config,
    mutationFn: loginWithEmailAndPassword,
  });
};
