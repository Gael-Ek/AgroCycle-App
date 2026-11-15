import * as Location from "expo-location";

export type ParcelAddress = {
  country: string;
  state: string;
  municipality: string;
};

export const LocationService = {
  async getLocation(
    latitude: number,
    longitude: number,
  ): Promise<ParcelAddress | null> {
    // Comprobar permisos
    let permission = await Location.getForegroundPermissionsAsync();

    // Solicitarlos si todavía no están concedidos
    if (!permission.granted) {
      permission = await Location.requestForegroundPermissionsAsync();
    }

    if (!permission.granted) {
      throw new Error("No se concedió el permiso de ubicación.");
    }

    // Obtener dirección mediante coordenadas
    const results = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const address = results[0];

    if (!address) return null;

    return {
      country: address.country ?? "",
      state: address.region ?? "",
      municipality: address.city ?? address.subregion ?? "",
    };
  },
};
