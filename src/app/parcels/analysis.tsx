import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCreateParcelAnalysis } from "@/hooks/use-analysis";
import { useGetParcelById } from "@/hooks/use-parcels";
import { translateCrop } from "@/utils/crop-translator";

export default function ParcelAnalysisScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Obtener información de la parcela
  const {
    data: parcel,
    isLoading: isParcelLoading,
    isError: isParcelError,
    refetch: refetchParcel,
  } = useGetParcelById(id);

  // Ejecutar análisis
  const {
    mutate: createAnalysis,
    data: analysis,
    isPending,
    isError: isAnalysisError,
    reset,
  } = useCreateParcelAnalysis();

  function handleAnalysis() {
    if (!parcel) return;

    reset();

    createAnalysis({
      terreno_name: parcel.terreno_name,
      municipality: parcel.municipality,
      country: parcel.country,
      state: parcel.state,
      latitude: parcel.latitude,
      longitude: parcel.longitude,
      area_hectares: parcel.area_hectares,
      target_crop: parcel.target_crop,
    });
  }

  if (isParcelLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#F4F7F0]">
        <ActivityIndicator size="large" color="#3D7548" />
        <Text className="mt-3 text-gray-500">
          Cargando información de la parcela...
        </Text>
      </SafeAreaView>
    );
  }

  if (isParcelError || !parcel) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#F4F7F0] px-6">
        <Ionicons name="alert-circle-outline" size={45} color="#DC6B5C" />

        <Text className="mt-4 text-lg font-bold text-gray-800">
          No se pudo cargar la parcela
        </Text>

        <Pressable
          onPress={() => refetchParcel()}
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
        contentContainerStyle={{ paddingBottom: 35 }}
      >
        {/* Encabezado */}
        <View className="flex-row items-center px-5 py-4">
          <Pressable
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full bg-white"
          >
            <Ionicons name="arrow-back" size={23} color="#263B2B" />
          </Pressable>

          <View className="ml-4 flex-1">
            <Text className="text-xl font-bold text-gray-800">
              Análisis de parcela
            </Text>

            <Text className="text-xs text-gray-500">{parcel.terreno_name}</Text>
          </View>
        </View>

        {/* Información de la parcela */}
        <View className="mx-5 mt-3 rounded-3xl bg-white p-5">
          <View className="flex-row items-center">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
              <Ionicons name="leaf" size={26} color="#3D7548" />
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-lg font-bold text-gray-800">
                {parcel.terreno_name}
              </Text>

              <Text className="mt-1 text-sm text-gray-500">
                {parcel.municipality}, {parcel.state}
              </Text>
            </View>
          </View>

          <View className="mt-5 border-t border-gray-100 pt-4">
            <Text className="text-xs text-gray-500">Cultivo principal</Text>

            <Text className="mt-1 font-semibold text-gray-800">
              {translateCrop(parcel.target_crop)}
            </Text>

            <Text className="mt-4 text-xs text-gray-500">Superficie</Text>

            <Text className="mt-1 font-semibold text-gray-800">
              {parcel.area_hectares} hectáreas
            </Text>
          </View>
        </View>

        {/* Introducción */}
        {!analysis && (
          <View className="mx-5 mt-5 rounded-3xl bg-white p-5">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
              <Ionicons name="analytics-outline" size={26} color="#3D7548" />
            </View>

            <Text className="mt-4 text-lg font-bold text-gray-800">
              Evalúa las condiciones de tu parcela
            </Text>

            <Text className="mt-2 text-sm leading-6 text-gray-500">
              Analizaremos la información de tu terreno para estimar su
              idoneidad para el cultivo seleccionado y generar recomendaciones.
            </Text>

            <Pressable
              onPress={handleAnalysis}
              disabled={isPending}
              className="mt-5 flex-row items-center justify-center rounded-2xl bg-green-700 py-4"
            >
              {isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Ionicons name="analytics-outline" size={20} color="white" />
                  <Text className="ml-2 font-bold text-white">
                    Generar análisis
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        )}

        {/* Cargando */}
        {isPending && (
          <View className="mx-5 mt-5 items-center rounded-3xl bg-white py-10">
            <ActivityIndicator size="large" color="#3D7548" />

            <Text className="mt-4 font-semibold text-gray-700">
              Analizando tu parcela...
            </Text>

            <Text className="mt-2 text-xs text-gray-500">
              Estamos procesando sus características.
            </Text>
          </View>
        )}

        {/* Error */}
        {isAnalysisError && !isPending && (
          <View className="mx-5 mt-5 items-center rounded-3xl bg-white p-6">
            <Ionicons name="alert-circle-outline" size={45} color="#DC6B5C" />

            <Text className="mt-3 text-lg font-bold text-gray-800">
              No se pudo realizar el análisis
            </Text>

            <Text className="mt-2 text-center text-sm text-gray-500">
              Comprueba tu conexión e intenta nuevamente.
            </Text>

            <Pressable
              onPress={handleAnalysis}
              className="mt-5 rounded-xl bg-green-700 px-6 py-3"
            >
              <Text className="font-semibold text-white">Reintentar</Text>
            </Pressable>
          </View>
        )}

        {/* Resultado */}
        {analysis && (
          <>
            {/* Idoneidad */}
            <View className="mx-5 mt-5 rounded-3xl bg-white p-5">
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={23} color="#3D7548" />

                <Text className="ml-2 text-lg font-bold text-gray-800">
                  Resultado del análisis
                </Text>
              </View>

              <Text className="mt-5 text-sm text-gray-500">
                Índice de idoneidad
              </Text>

              <Text className="mt-1 text-4xl font-bold text-green-800">
                {analysis.suitability_score}%
              </Text>

              <View className="mt-4 h-3 overflow-hidden rounded-full bg-gray-100">
                <View
                  className="h-full rounded-full bg-green-600"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(100, analysis.suitability_score),
                    )}%`,
                  }}
                />
              </View>

              <Text className="mt-4 text-xs text-gray-500">
                Superficie estimada
              </Text>

              <Text className="mt-1 text-xl font-bold text-gray-800">
                {analysis.estimated_area_hectares} hectáreas
              </Text>
            </View>

            {/* Recomendaciones */}
            <View className="mx-5 mt-5 rounded-3xl bg-white p-5">
              <Text className="text-lg font-bold text-gray-800">
                Recomendaciones
              </Text>

              <Text className="mt-1 text-xs text-gray-500">
                Sugerencias generadas para tu parcela
              </Text>

              {analysis.recommendations.map((recommendation, index) => (
                <View key={index} className="mt-4 flex-row">
                  <Ionicons name="leaf-outline" size={19} color="#3D7548" />

                  <Text className="ml-3 flex-1 text-sm leading-6 text-gray-600">
                    {recommendation}
                  </Text>
                </View>
              ))}
            </View>

            {/* Fuente */}
            <View className="mx-5 mt-5 rounded-2xl bg-green-50 p-4">
              <Text className="text-xs text-green-800">
                Fuente del análisis: {analysis.source}
              </Text>
            </View>

            {/* Volver a analizar */}
            <Pressable
              onPress={handleAnalysis}
              disabled={isPending}
              className="mx-5 mt-5 flex-row items-center justify-center rounded-2xl border border-green-700 py-4"
            >
              <Ionicons name="refresh-outline" size={19} color="#3D7548" />

              <Text className="ml-2 font-bold text-green-800">
                Volver a analizar
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
