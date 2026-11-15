import axios from "axios";

import { api } from "@/lib/apiClient";
import type { ClimateIndicators } from "@/types/climate";

export class ClimateService {
  static async getClimateIndicators(
    lat: number,
    lon: number,
  ): Promise<ClimateIndicators> {
    try {
      console.log("Consultando clima:", {
        url: api.defaults.baseURL + "/climate/",
        lat,
        lon,
      });

      const { data } = await api.get<ClimateIndicators>("/climate/", {
        params: { lat, lon },
      });

      console.log("Respuesta del clima:", data);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("ERROR HTTP:", error.response?.status);
        console.log("RESPUESTA DEL SERVIDOR:", error.response?.data);
        console.log("URL:", error.config?.url);
        console.log("MENSAJE:", error.message);
      } else {
        console.log("ERROR:", error);
      }

      throw error;
    }
  }
}
