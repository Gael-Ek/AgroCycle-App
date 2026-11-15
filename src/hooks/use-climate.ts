import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";

import { ClimateService } from "@/services/climate.service";
import { LocationService } from "@/services/location.service";

export const climateKeys = {
  all: ["climate"] as const,
  coordinates: (lat: number, lon: number) => ["climate", lat, lon] as const,
  device: ["climate", "device"] as const,
};

// Para consultar el clima de una parcela específica
export function useGetClimateIndicators(lat?: number, lon?: number) {
  return useQuery({
    queryKey:
      typeof lat === "number" && typeof lon === "number"
        ? climateKeys.coordinates(lat, lon)
        : [...climateKeys.all, "disabled"],

    queryFn: () => ClimateService.getClimateIndicators(lat!, lon!),

    enabled:
      typeof lat === "number" &&
      typeof lon === "number" &&
      Number.isFinite(lat) &&
      Number.isFinite(lon),

    staleTime: 1000 * 60 * 15,
  });
}

// Para consultar el clima de la ubicación actual del dispositivo
export function useGetDeviceClimate() {
  return useQuery({
    queryKey: climateKeys.device,

    queryFn: async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        throw new Error("Se necesita permiso para acceder a tu ubicación.");
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;

      // Consultar clima
      const climate = await ClimateService.getClimateIndicators(
        latitude,
        longitude,
      );

      // Obtener dirección
      const address = await LocationService.getLocation(latitude, longitude);

      const locationName = address
        ? [address.municipality, address.state, address.country]
            .filter(Boolean)
            .join(", ")
        : "Ubicación desconocida";

      return {
        ...climate,
        locationName,
      };
    },

    staleTime: 1000 * 60 * 15,
  });
}
