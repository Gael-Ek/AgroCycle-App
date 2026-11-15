import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export type ParcelCoordinates = {
  latitude: number;
  longitude: number;
};

type Props = {
  value: ParcelCoordinates | null;
  onChange: (coordinates: ParcelCoordinates) => void;
};

const INITIAL_REGION = {
  latitude: 20.9674,
  longitude: -89.5926,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export function ParcelMapPicker({ value, onChange }: Props) {
  return (
    <View className="mt-5">
      <Text className="mb-2 text-sm font-semibold text-[#173D2B]">
        Ubicación del terreno
      </Text>

      <Text className="mb-3 text-sm text-[#68756B]">
        Toca el mapa para colocar el pin o arrástralo para ajustar la ubicación.
      </Text>

      <View className="overflow-hidden rounded-xl border border-[#DCE5D9]">
        <MapView
          style={{ width: "100%", height: 280 }}
          initialRegion={INITIAL_REGION}
          onPress={(event) => onChange(event.nativeEvent.coordinate)}
        >
          {value && (
            <Marker
              coordinate={value}
              draggable
              onDragEnd={(event) => onChange(event.nativeEvent.coordinate)}
              title="Mi terreno"
              description="Ubicación seleccionada"
            />
          )}
        </MapView>
      </View>

      {value ? (
        <View className="mt-3 rounded-lg bg-[#E8EFE4] p-3">
          <Text className="text-sm font-semibold text-[#173D2B]">
            Coordenadas seleccionadas
          </Text>

          <Text className="mt-1 text-xs text-[#68756B]">
            Latitud: {value.latitude.toFixed(6)}
          </Text>

          <Text className="text-xs text-[#68756B]">
            Longitud: {value.longitude.toFixed(6)}
          </Text>
        </View>
      ) : (
        <Text className="mt-3 text-sm text-[#89958A]">
          Todavía no has seleccionado una ubicación.
        </Text>
      )}
    </View>
  );
}
