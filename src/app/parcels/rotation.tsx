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

import { useGetParcelById } from "@/hooks/use-parcels";
import { useGetRotationStrategy } from "@/hooks/use-rotation";
import { translateCrop } from "@/utils/crop-translator";

export default function RotationScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  // Obtener información de la parcela
  const {
    data: parcel,
    isLoading: isParcelLoading,
    isError: isParcelError,
    refetch: refetchParcel,
  } = useGetParcelById(id);

  // Obtener estrategia de rotación
  const {
    data: rotation,
    isLoading: isRotationLoading,
    isError: isRotationError,
    refetch: refetchRotation,
  } = useGetRotationStrategy(parcel?.target_crop ?? "");

  if (isParcelLoading) {
    return <LoadingScreen message="Cargando información de la parcela..." />;
  }

  if (isParcelError || !parcel) {
    return (
      <ErrorScreen
        message="No se pudo cargar la parcela."
        onRetry={() => refetchParcel()}
        onBack={() => router.back()}
      />
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
              Rotación de cultivos
            </Text>

            <Text className="text-xs text-gray-500">{parcel.terreno_name}</Text>
          </View>
        </View>

        {/* Cultivo actual */}
        <View className="mx-5 mt-3 rounded-3xl bg-white p-5">
          <Text className="text-sm text-gray-500">
            Cultivo actual de la parcela
          </Text>

          <Text className="mt-2 text-2xl font-bold text-gray-800">
            {translateCrop(parcel.target_crop)}
          </Text>

          <Text className="mt-2 text-sm text-gray-500">
            Analizamos alternativas para establecer una rotación adecuada.
          </Text>
        </View>

        {/* Cargando */}
        {isRotationLoading ? (
          <View className="mx-5 mt-5 items-center rounded-3xl bg-white py-12">
            <ActivityIndicator size="large" color="#3D7548" />

            <Text className="mt-4 font-semibold text-gray-700">
              Analizando rotación de cultivos...
            </Text>

            <Text className="mt-2 text-xs text-gray-500">
              Esto puede tomar unos momentos.
            </Text>
          </View>
        ) : isRotationError || !rotation ? (
          /* Error */
          <View className="mx-5 mt-5 items-center rounded-3xl bg-white p-6">
            <Ionicons name="alert-circle-outline" size={45} color="#DC6B5C" />

            <Text className="mt-3 text-lg font-bold text-gray-800">
              No se pudo obtener la estrategia
            </Text>

            <Text className="mt-2 text-center text-sm text-gray-500">
              Comprueba tu conexión e intenta nuevamente.
            </Text>

            <Pressable
              onPress={() => refetchRotation()}
              className="mt-5 rounded-xl bg-green-700 px-6 py-3"
            >
              <Text className="font-semibold text-white">Reintentar</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {/* Estrategia principal */}
            <View className="mx-5 mt-5 rounded-3xl bg-white p-5">
              <View className="flex-row items-center">
                <Ionicons name="leaf" size={23} color="#3D7548" />

                <Text className="ml-2 text-lg font-bold text-gray-800">
                  Estrategia recomendada
                </Text>
              </View>

              <Text className="mt-4 text-xl font-bold text-green-800">
                {rotation.strategy_name}
              </Text>

              <Text className="mt-3 text-sm leading-6 text-gray-600">
                {rotation.explanation}
              </Text>

              <View className="mt-5 rounded-2xl bg-green-50 p-4">
                <Text className="text-sm font-medium text-green-800">
                  Puntuación general
                </Text>

                <Text className="mt-1 text-3xl font-bold text-green-900">
                  {rotation.overall_score}
                </Text>
              </View>
            </View>

            {/* Secuencia de cultivos */}
            <View className="mx-5 mt-5 rounded-3xl bg-white p-5">
              <Text className="text-lg font-bold text-gray-800">
                Cultivos recomendados
              </Text>

              <Text className="mt-1 text-xs text-gray-500">
                Secuencia propuesta para tu parcela
              </Text>

              {rotation.recommended_sequence.map((crop, index) => (
                <View
                  key={`${crop.crop_name}-${index}`}
                  className="mt-4 rounded-2xl border border-gray-100 p-4"
                >
                  <View className="flex-row items-center">
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <Text className="font-bold text-green-800">
                        {index + 1}
                      </Text>
                    </View>

                    <View className="ml-3 flex-1">
                      <Text className="font-bold text-gray-800">
                        {crop.crop_name}
                      </Text>

                      <Text className="mt-1 text-xs text-gray-500">
                        Familia: {crop.crop_family}
                      </Text>
                    </View>

                    <View className="rounded-xl bg-green-50 px-3 py-2">
                      <Text className="font-bold text-green-800">
                        {crop.score}
                      </Text>
                    </View>
                  </View>

                  {/* Beneficios */}
                  <View className="mt-5">
                    <Text className="mb-3 font-semibold text-green-800">
                      Beneficios
                    </Text>

                    {crop.benefits.map((benefit, i) => (
                      <View key={i} className="mb-2 flex-row">
                        <Ionicons
                          name="checkmark-circle"
                          size={17}
                          color="#3D7548"
                        />

                        <Text className="ml-2 flex-1 text-sm text-gray-600">
                          {benefit}
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* Riesgos */}
                  {crop.risks.length > 0 && (
                    <View className="mt-4">
                      <Text className="mb-3 font-semibold text-orange-700">
                        Riesgos a considerar
                      </Text>

                      {crop.risks.map((risk, i) => (
                        <View key={i} className="mb-2 flex-row">
                          <Ionicons
                            name="warning-outline"
                            size={17}
                            color="#D97706"
                          />

                          <Text className="ml-2 flex-1 text-sm text-gray-600">
                            {risk}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function LoadingScreen({ message }: { message: string }) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#F4F7F0]">
      <ActivityIndicator size="large" color="#3D7548" />
      <Text className="mt-3 text-gray-500">{message}</Text>
    </SafeAreaView>
  );
}

function ErrorScreen({
  message,
  onRetry,
  onBack,
}: {
  message: string;
  onRetry: () => void;
  onBack: () => void;
}) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#F4F7F0] px-6">
      <Ionicons name="alert-circle-outline" size={45} color="#DC6B5C" />

      <Text className="mt-4 text-center font-bold text-gray-800">
        {message}
      </Text>

      <Pressable
        onPress={onRetry}
        className="mt-5 rounded-xl bg-green-700 px-6 py-3"
      >
        <Text className="font-semibold text-white">Reintentar</Text>
      </Pressable>

      <Pressable onPress={onBack} className="mt-4">
        <Text className="font-semibold text-gray-600">Regresar</Text>
      </Pressable>
    </SafeAreaView>
  );
}
