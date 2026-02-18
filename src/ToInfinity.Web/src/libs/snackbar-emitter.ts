import type { AlertColor } from "@mui/material";

type SnackbarListener = (message: string, severity: AlertColor) => void;

let listener: SnackbarListener | null = null;

export const snackbarEmitter = {
  subscribe(fn: SnackbarListener) {
    listener = fn;
    return () => {
      listener = null;
    };
  },

  emit(message: string, severity: AlertColor = "error") {
    listener?.(message, severity);
  },
};
