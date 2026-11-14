import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuthStore((state) => state);

  // Obtener la primera letra del nombre o un signo de interrogación
  const displayName = user?.user_metadata?.display_name || user?.email || "?";
  const initial = displayName.charAt(0).toUpperCase();
  return (
    <SafeAreaView className="flex-1 bg-[#F4F7F0]">
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-[22px] pt-[15px] pb-5">
          <View>
            <Text className="text-[25px] font-bold text-[#245238]">
              🌱 AgroCycle
            </Text>
            <Text className="text-[#819083] text-xs mt-[3px]">
              Agricultura inteligente
            </Text>
          </View>

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
            <Text className="text-white text-xs">📍 Yucatán, México</Text>
          </View>
        </View>

        {/* Section Header: Condiciones ambientales */}
        <View className="px-[22px] mb-[14px]">
          <Text className="text-[19px] font-bold text-[#244631]">
            Condiciones ambientales
          </Text>
          <Text className="text-[#849184] text-xs mt-1">Datos de ejemplo</Text>
        </View>

        {/* Metrics Grid */}
        <View className="flex-row flex-wrap px-[15px] mb-[27px]">
          <View className="w-[46%] bg-white m-[2%] p-[15px] rounded-[17px] elevation-2 shadow-sm">
            <Text className="text-[27px] mb-2.5">🌡️</Text>
            <Text className="text-[#778579] text-xs">Temperatura</Text>
            <Text className="text-[#245238] text-[23px] font-bold mt-[5px]">
              29 °C
            </Text>
            <Text className="text-[#91A094] text-[10px] mt-[5px]">
              Ambiente cálido
            </Text>
          </View>

          <View className="w-[46%] bg-white m-[2%] p-[15px] rounded-[17px] elevation-2 shadow-sm">
            <Text className="text-[27px] mb-2.5">💧</Text>
            <Text className="text-[#778579] text-xs">Humedad</Text>
            <Text className="text-[#245238] text-[23px] font-bold mt-[5px]">
              68 %
            </Text>
            <Text className="text-[#91A094] text-[10px] mt-[5px]">
              Humedad moderada
            </Text>
          </View>

          <View className="w-[46%] bg-white m-[2%] p-[15px] rounded-[17px] elevation-2 shadow-sm">
            <Text className="text-[27px] mb-2.5">🌧️</Text>
            <Text className="text-[#778579] text-xs">Precipitación</Text>
            <Text className="text-[#245238] text-[23px] font-bold mt-[5px]">
              12 mm
            </Text>
            <Text className="text-[#91A094] text-[10px] mt-[5px]">
              Dato ilustrativo
            </Text>
          </View>

          <View className="w-[46%] bg-white m-[2%] p-[15px] rounded-[17px] elevation-2 shadow-sm">
            <Text className="text-[27px] mb-2.5">🌱</Text>
            <Text className="text-[#778579] text-xs">Condición del suelo</Text>
            <Text className="text-[#245238] text-[23px] font-bold mt-[5px]">
              Húmedo
            </Text>
            <Text className="text-[#91A094] text-[10px] mt-[5px]">
              Ejemplo de condición
            </Text>
          </View>
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
          onPress={() => router.push("/terrenos")}
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

        {/* Action Card 2 */}
        <Pressable
          className="flex-row items-center bg-white mx-5 mb-3 p-[15px] rounded-[16px] elevation-2 shadow-sm"
          onPress={() => router.push("/explore")}
        >
          <View className="w-[48px] h-[48px] bg-[#EAF3E9] rounded-[13px] justify-center items-center">
            <Text className="text-[25px]">🌾</Text>
          </View>
          <View className="flex-1 ml-[13px]">
            <Text className="text-[#28533A] text-[15px] font-bold">
              Explorar cultivos
            </Text>
            <Text className="text-[#849184] text-[11px] mt-1">
              Consulta herramientas e información agrícola.
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
