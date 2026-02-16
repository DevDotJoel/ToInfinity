import { API_URL } from "../../../config/env";

export const getGoogleAuthUrl = (returnUrl: string = "/"): string => {
  return `${API_URL}/api/auth/external-login?provider=Google&returnUrl=${encodeURIComponent(returnUrl)}`;
};

export const handleGoogleLogin = (returnUrl: string = "/"): void => {
  const url = getGoogleAuthUrl(returnUrl);
  window.location.href = url;
};
