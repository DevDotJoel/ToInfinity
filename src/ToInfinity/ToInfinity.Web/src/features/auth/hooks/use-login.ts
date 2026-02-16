import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../../libs/use-snackbar";
import { queryClient } from "../../../libs/react-query";
import type { MutationConfig } from "../../../libs/react-query";
import { loginWithEmailAndPassword } from "../api/login";

type UseLoginOptions = {
  config?: MutationConfig<typeof loginWithEmailAndPassword>;
};

export const useLogin = ({ config }: UseLoginOptions = {}) => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    onSuccess: (data) => {
      showSnackbar(data.message || "Signed in successfully!", "success");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
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
