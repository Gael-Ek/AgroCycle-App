import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ClimateMetric } from "@/components/ui/climatic-metrics";
import { useGetClimateIndicators } from "@/hooks/use-climate";
import { useDeleteParcel, useGetParcelById } from "@/hooks/use-parcels";
import { translateCrop } from "@/utils/crop-translator";

export default function ParcelDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: parcel,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useGetParcelById(id);

  const {
    data: climate,
    isLoading: isClimateLoading,
    isError: isClimateError,
    refetch: refetchClimate,
  } = useGetClimateIndicators(parcel?.latitude, parcel?.longitude);

  const deleteParcel = useDeleteParcel();

  function handleEdit() {
    router.push({
      pathname: "/parcels/edit",
      params: {
        id: String(parcel?.id),
      },
    });
  }

  function handleDelete() {
    Alert.alert(
      "Eliminar parcela",
      `¿Estás seguro de que deseas eliminar "${parcel?.terreno_name}"? Esta acción no se puede deshacer.`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            deleteParcel.mutate(String(parcel?.id), {
              onSuccess: () => {
                Alert.alert(
                  "Parcela eliminada",
                  "La parcela se eliminó correctamente.",
                  [
                    {
                      text: "Aceptar",
                      onPress: () => router.back(),
                    },
                  ],
                );
              },
              onError: (error) => {
                console.error("Error al eliminar parcela:", error);

                Alert.alert(
                  "Error",
                  "No fue posible eliminar la parcela. Inténtalo nuevamente.",
                );
              },
            });
          },
        },
      ],
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#F4F7F0]">
        <ActivityIndicator size="large" color="#3D7548" />
        <Text className="mt-3 text-gray-500">Cargando información...</Text>
      </SafeAreaView>
    );
  }

  if (isError || !parcel) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#F4F7F0] px-6">
        <Ionicons name="alert-circle-outline" size={48} color="#DC6B5C" />

        <Text className="mt-4 text-lg font-bold text-gray-800">
          No se pudo cargar la parcela
        </Text>

        <Text className="mt-2 text-center text-gray-500">
          Comprueba tu conexión e intenta nuevamente.
        </Text>

        <Pressable
          onPress={() => refetch()}
          className="mt-5 rounded-xl bg-green-700 px-6 py-3"
        >
          <Text className="font-semibold text-white">Reintentar</Text>
        </Pressable>

        <Pressable onPress={() => router.back()} className="mt-4">
          <Text className="font-semibold text-gray-600">Regresar</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F4F7F0]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Encabezado */}
        <View className="flex-row items-center px-5 py-4">
          <Pressable
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full bg-white"
          >
            <Ionicons name="arrow-back" size={23} color="#263B2B" />
          </Pressable>

          <Text className="ml-4 text-xl font-bold text-gray-800">
            Detalles de la parcela
          </Text>
        </View>

        {/* Nombre y ubicación */}
        <View className="mx-5 mt-3 rounded-3xl bg-white p-5">
          <View className="flex-row items-center">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
              <Ionicons name="leaf" size={26} color="#3D7548" />
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-xl font-bold text-gray-800">
                {parcel.terreno_name}
              </Text>

              <Text className="mt-1 text-sm text-gray-500">
                {parcel.municipality}, {parcel.state}
              </Text>
            </View>
          </View>

          <View className="mt-5 rounded-2xl bg-green-50 p-4">
            <Text className="text-sm text-green-800">Índice de idoneidad</Text>

            <Text className="mt-1 text-xs text-green-700">
              Aptitud estimada para el cultivo
            </Text>
          </View>
        </View>

        {/* Acciones de la parcela */}
        <View className="mx-5 mt-4 flex-row gap-3">
          <Pressable
            onPress={handleEdit}
            className="flex-1 flex-row items-center justify-center rounded-xl bg-[#286B45] p-4"
          >
            <Ionicons name="create-outline" size={20} color="white" />

            <Text className="ml-2 font-bold text-white">Editar</Text>
          </Pressable>

          <Pressable
            onPress={handleDelete}
            disabled={deleteParcel.isPending}
            className="flex-1 flex-row items-center justify-center rounded-xl border border-red-200 bg-red-50 p-4"
          >
            {deleteParcel.isPending ? (
              <ActivityIndicator color="#DC6B5C" />
            ) : (
              <>
                <Ionicons name="trash-outline" size={20} color="#DC6B5C" />

                <Text className="ml-2 font-bold text-red-600">Eliminar</Text>
              </>
            )}
          </Pressable>
        </View>

        {/* Información general */}
        <View className="mx-5 mt-5 rounded-3xl bg-white p-5">
          <Text className="mb-4 text-lg font-bold text-gray-800">
            Información general
          </Text>

          <DetailRow
            icon="resize-outline"
            label="Superficie"
            value={`${parcel.area_hectares} hectáreas`}
          />

          <DetailRow
            icon="leaf-outline"
            label="Cultivo principal"
            value={translateCrop(parcel.target_crop)}
          />

          <DetailRow icon="earth-outline" label="País" value={parcel.country} />

          <DetailRow
            icon="location-outline"
            label="Estado"
            value={parcel.state}
          />

          <DetailRow
            icon="business-outline"
            label="Municipio"
            value={parcel.municipality}
          />
        </View>

        {/* Coordenadas */}
        <View className="mx-5 mt-5 rounded-3xl bg-white p-5">
          <Text className="mb-4 text-lg font-bold text-gray-800">
            Ubicación geográfica
          </Text>

          <DetailRow
            icon="navigate-outline"
            label="Latitud"
            value={String(parcel.latitude)}
          />

          <DetailRow
            icon="navigate-outline"
            label="Longitud"
            value={String(parcel.longitude)}
          />
        </View>

        {/* Fecha de registro */}
        <View className="mx-5 mt-5 rounded-3xl bg-white p-5">
          <Text className="mb-2 text-lg font-bold text-gray-800">Registro</Text>

          <Text className="text-sm text-gray-500">Fecha de creación</Text>

          <Text className="mt-1 font-semibold text-gray-800">
            {new Date(parcel.created_at).toLocaleDateString("es-MX", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
        </View>

        {/* Indicadores climáticos */}
        <View className="mx-5 mt-5 rounded-3xl bg-white p-5">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-lg font-bold text-gray-800">
                Condiciones climáticas
              </Text>

              <Text className="mt-1 text-xs text-gray-500">
                Datos satelitales de NASA
              </Text>
            </View>

            <Text className="text-2xl">🌎</Text>
          </View>

          {isClimateLoading ? (
            <View className="items-center py-6">
              <ActivityIndicator color="#3D7548" />
              <Text className="mt-2 text-sm text-gray-500">
                Consultando datos climáticos...
              </Text>
            </View>
          ) : isClimateError || !climate ? (
            <View className="items-center py-4">
              <Text className="text-sm text-gray-500 text-center">
                No fue posible obtener los indicadores climáticos.
              </Text>

              <Pressable
                onPress={() => refetchClimate()}
                className="mt-3 rounded-xl bg-green-700 px-5 py-2"
              >
                <Text className="font-semibold text-white">Reintentar</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <ClimateMetric
                emoji="🌡️"
                label="Temperatura promedio"
                value={`${climate.temperature_avg} °C`}
              />

              <ClimateMetric
                emoji="🌧️"
                label="Precipitación acumulada"
                value={`${climate.rainfall_total} mm`}
              />

              <ClimateMetric
                emoji="💧"
                label="Humedad del suelo"
                value={String(climate.soil_moisture)}
              />

              <Text className="mt-3 text-[10px] text-gray-400">
                Fuente: {climate.source}
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type DetailRowProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
};

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <View className="mb-4 flex-row items-center">
      <View className="h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
        <Ionicons name={icon} size={20} color="#52815A" />
      </View>

      <View className="ml-3 flex-1">
        <Text className="text-xs text-gray-500">{label}</Text>
        <Text className="mt-1 font-semibold text-gray-800">{value}</Text>
      </View>
    </View>
  );
}
