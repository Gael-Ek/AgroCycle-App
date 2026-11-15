import { Logo } from "@/components/ui/logo";
import { useGetDeviceClimate } from "@/hooks/use-climate";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuthStore((state) => state);
  const {
    data: climate,
    isLoading: isClimateLoading,
    isError: isClimateError,
    error: climateError,
    refetch: refetchClimate,
  } = useGetDeviceClimate();

  // Obtener la primera letra del nombre o un signo de interrogación
  const displayName = user?.user_metadata?.display_name || user?.email || "?";
  const initial = displayName.charAt(0).toUpperCase();
  return (
    <SafeAreaView className="flex-1 bg-[#F4F7F0]">
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-[22px] pt-[15px] pb-5">
          <Logo />

          <View className="w-[43px] h-[43px] rounded-[22px] bg-[#DCEBDD] justify-center items-center">
            {/* Botón hacia el Perfil */}
            <Pressable
              onPress={() => router.push("/profile")}
              className="w-[43px] h-[43px] rounded-[22px] bg-[#DCEBDD] justify-center items-center active:opacity-80 shadow-sm"
            >
              <Text className="text-[#245238] font-bold text-[18px]">
                {initial}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Welcome Card */}
        <View className="bg-[#245238] mx-5 p-[23px] rounded-[20px] mb-[27px]">
          <Text className="text-[#C5DEC8] text-[11px] font-bold tracking-[1.5px]">
            BIENVENIDO A
          </Text>
          <Text className="text-white text-[29px] font-bold mt-[7px]">
            AgroCycle
          </Text>
          <Text className="text-[#E0EDE1] text-sm leading-[21px] mt-2">
            Adapta tus cultivos a las condiciones de tu terreno.
          </Text>

          <View className="self-start bg-[#386B4A] px-3 py-2 rounded-[20px] mt-[17px]">
            <Text className="text-white text-xs">
              📍{" "}
              {isClimateLoading
                ? "Obteniendo ubicación..."
                : climate?.locationName || "Ubicación desconocida"}
            </Text>
          </View>
        </View>

        {/* Condiciones ambientales */}
        <View className="px-[22px] mb-[14px]">
          <Text className="text-[19px] font-bold text-[#244631]">
            Condiciones ambientales
          </Text>

          <Text className="text-[#849184] text-xs mt-1">
            Datos de tu ubicación actual
          </Text>
        </View>

        <View className="mx-5 mb-[27px] rounded-3xl bg-white p-5 shadow-sm elevation-2">
          {isClimateLoading ? (
            <View className="items-center py-8">
              <ActivityIndicator size="large" color="#3D7548" />

              <Text className="mt-3 text-sm text-gray-500">
                Obteniendo tu ubicación y consultando el clima...
              </Text>
            </View>
          ) : isClimateError || !climate ? (
            <View className="items-center py-5">
              <Text className="text-3xl">📍</Text>

              <Text className="mt-3 text-center font-bold text-[#245238]">
                No se pudieron obtener los indicadores
              </Text>

              <Text className="mt-2 text-center text-xs text-gray-500">
                {climateError instanceof Error
                  ? climateError.message
                  : "Verifica tu conexión y los permisos de ubicación."}
              </Text>

              <Pressable
                onPress={() => refetchClimate()}
                className="mt-4 rounded-xl bg-[#245238] px-5 py-3"
              >
                <Text className="font-semibold text-white">
                  Intentar nuevamente
                </Text>
              </Pressable>
            </View>
          ) : (
            <>
              <View className="mb-4 flex-row items-center justify-between">
                <View>
                  <Text className="text-sm font-bold text-[#245238]">
                    Tu ubicación actual
                  </Text>

                  <Text className="mt-1 text-xs text-gray-500">
                    {climate.latitude.toFixed(4)},{" "}
                    {climate.longitude.toFixed(4)}
                  </Text>
                </View>

                <Text className="text-2xl">🌎</Text>
              </View>

              <View className="flex-row flex-wrap justify-between">
                <View className="mb-3 w-[48%] rounded-2xl bg-[#F4F7F0] p-3">
                  <Text className="text-2xl">🌡️</Text>

                  <Text className="mt-2 text-xs text-gray-500">
                    Temperatura promedio
                  </Text>

                  <Text className="mt-1 text-2xl font-bold text-[#245238]">
                    {climate.temperature_avg} °C
                  </Text>
                </View>

                <View className="mb-3 w-[48%] rounded-2xl bg-[#F4F7F0] p-3">
                  <Text className="text-2xl">🌧️</Text>

                  <Text className="mt-2 text-xs text-gray-500">
                    Precipitación
                  </Text>

                  <Text className="mt-1 text-2xl font-bold text-[#245238]">
                    {climate.rainfall_total} mm
                  </Text>
                </View>

                <View className="w-full rounded-2xl bg-[#F4F7F0] p-3">
                  <Text className="text-2xl">💧</Text>

                  <Text className="mt-2 text-xs text-gray-500">
                    Humedad del suelo
                  </Text>

                  <Text className="mt-1 text-2xl font-bold text-[#245238]">
                    {climate.soil_moisture}
                  </Text>
                </View>
              </View>

              <Text className="mt-3 text-[10px] text-gray-400">
                Fuente: {climate.source}
              </Text>
            </>
          )}
        </View>

        {/* Section Header: Mis herramientas */}
        <View className="px-[22px] mb-[14px]">
          <Text className="text-[19px] font-bold text-[#244631]">
            Mis herramientas
          </Text>
          <Text className="text-[#849184] text-xs mt-1">
            Administra tu actividad agrícola
          </Text>
        </View>

        {/* Action Card 1 */}
        <Pressable
          className="flex-row items-center bg-white mx-5 mb-3 p-[15px] rounded-[16px] elevation-2 shadow-sm"
          onPress={() => router.push("/parcels")}
        >
          <View className="w-[48px] h-[48px] bg-[#EAF3E9] rounded-[13px] justify-center items-center">
            <Text className="text-[25px]">🗺️</Text>
          </View>
          <View className="flex-1 ml-[13px]">
            <Text className="text-[#28533A] text-[15px] font-bold">
              Mis terrenos
            </Text>
            <Text className="text-[#849184] text-[11px] mt-1">
              Registra y administra tus terrenos agrícolas.
            </Text>
          </View>
          <Text className="text-[#477D56] text-[28px]">›</Text>
        </Pressable>

        {/* Tip Card */}
        <View className="bg-[#E5F0E2] mx-5 mt-[13px] p-[17px] rounded-[16px]">
          <Text className="text-[#28533A] text-[15px] font-bold">
            🌿 Consejo agrícola
          </Text>
          <Text className="text-[#58725D] text-xs leading-[19px] mt-2">
            Conocer las condiciones del suelo y el clima ayuda a elegir cultivos
            adecuados y planificar la rotación.
          </Text>
        </View>

        {/* Footer */}
        <Text className="text-[#96A196] text-[11px] text-center my-[25px]">
          AgroCycle · Cultivando un futuro sostenible
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
