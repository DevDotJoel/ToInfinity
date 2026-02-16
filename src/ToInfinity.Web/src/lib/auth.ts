import apiClient from '../libs/api-client';

export interface GoogleAuthResponse {
  url: string;
}

export const getGoogleAuthUrl = async (): Promise<GoogleAuthResponse> => {
  const response = await apiClient.get<GoogleAuthResponse>('/auth/google');
  return response.data;
};

export const handleGoogleLogin = async () => {
  try {
    const { url } = await getGoogleAuthUrl();
    window.location.href = url;
  } catch (error) {
    console.error('Failed to initiate Google authentication:', error);
    throw error;
  }
};
