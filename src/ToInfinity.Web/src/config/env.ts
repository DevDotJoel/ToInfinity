export const API_URL =  process.env.NODE_ENV === "development"
? import.meta.env.VITE_API_DEV_URL as string:import.meta.env.VITE_API_PROD_URL as string;
