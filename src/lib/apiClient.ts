import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1`,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Interceptor de peticiones
api.interceptors.request.use(
  (config) => {
    // Obtener el token de Supabase desde Zustand
    const token = useAuthStore.getState().session?.access_token;

    // Agregar el token automáticamente
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("\n========== PETICIÓN HTTP ==========");
    console.log("URL:", `${config.baseURL}${config.url}`);
    console.log("MÉTODO:", config.method?.toUpperCase());
    console.log("AUTH:", token ? "Bearer token incluido" : "Sin token");
    console.log("==================================\n");

    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor de respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("\n========== ERROR HTTP ==============");
    console.log("MESSAGE:", error.message);
    console.log("STATUS:", error.response?.status);
    console.log("RESPONSE:", JSON.stringify(error.response?.data, null, 2));
    console.log("===================================\n");

    return Promise.reject(error);
  },
);
