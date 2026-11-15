import { Parcel } from "@/types/parcel";
import { translateCrop } from "@/utils/crop-translator";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

type ParcelCardProps = {
  parcel: Parcel;
  onPress: () => void;
};

export function ParcelCard({ parcel, onPress }: ParcelCardProps) {
  const handleAnalysis = () => {
    router.push({
      pathname: "/parcels/analysis",
      params: { id: String(parcel.id) },
    });
  };

  const handleRotation = () => {
    router.push({
      pathname: "/parcels/rotation",
      params: { id: String(parcel.id) },
    });
  };

  return (
    <Pressable
      onPress={onPress}
      className="mb-4 rounded-2xl bg-white p-4 active:opacity-70"
    >
      {/* Nombre e idoneidad */}
      <View className="flex-row items-center justify-between">
        <Text className="flex-1 text-lg font-bold text-gray-800">
          {parcel.terreno_name}
        </Text>
      </View>

      {/* Ubicación */}
      <View className="mt-2 flex-row items-center">
        <Ionicons name="location-outline" size={15} color="#89958A" />

        <Text className="ml-1 text-sm text-gray-500">
          {parcel.municipality}, {parcel.state}
        </Text>
      </View>

      {/* Información */}
      <View className="mt-3 flex-row justify-between">
        <View className="flex-row items-center">
          <Ionicons name="resize-outline" size={16} color="#52815A" />

          <Text className="ml-1 text-sm text-gray-600">
            {parcel.area_hectares} ha
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="leaf-outline" size={16} color="#52815A" />

          <Text className="ml-1 text-sm text-gray-600">
            {translateCrop(parcel.target_crop)}
          </Text>
        </View>
      </View>

      {/* Separador */}
      <View className="my-4 h-[1px] bg-gray-100" />

      {/* Acciones */}
      <View className="flex-row gap-2">
        {/* Análisis */}
        <Pressable
          onPress={(event) => {
            event.stopPropagation();
            handleAnalysis();
          }}
          className="flex-1 flex-row items-center justify-center rounded-xl bg-green-700 py-3 active:opacity-70"
        >
          <Ionicons name="analytics-outline" size={17} color="white" />

          <Text className="ml-2 text-xs font-bold text-white">Analizar</Text>
        </Pressable>

        {/* Rotación */}
        <Pressable
          onPress={(event) => {
            event.stopPropagation();
            handleRotation();
          }}
          className="flex-1 flex-row items-center justify-center rounded-xl border border-green-700 py-3 active:bg-green-50"
        >
          <Ionicons name="sync-outline" size={17} color="#286B45" />

          <Text className="ml-2 text-xs font-bold text-green-800">
            Rotación
          </Text>
        </Pressable>
      </View>

      {/* Acceso a detalles */}
      <View className="mt-3 flex-row items-center justify-center">
        <Text className="text-xs font-semibold text-gray-400">
          Ver detalles de la parcela
        </Text>

        <Ionicons
          name="chevron-forward"
          size={14}
          color="#89958A"
          style={{ marginLeft: 3 }}
        />
      </View>
    </Pressable>
  );
}
