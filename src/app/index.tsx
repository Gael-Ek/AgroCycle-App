import { useRouter } from "expo-router";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F4F7F0]">
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerClassName="grow px-6 pt-5 pb-[25px]"
        showsVerticalScrollIndicator={false}
      >
        {/* LOGOTIPO */}
        <View className="flex-row items-center justify-center mb-[25px]">
          <Text className="text-[29px] mr-2">🌱</Text>
          <Text className="text-[27px] font-bold text-[#173D2B] tracking-[0.5px]">
            AgroCycle
          </Text>
        </View>

        {/* ILUSTRACIÓN */}
        <View className="h-[205px] bg-[#E2EDDF] rounded-[22px] justify-end items-center overflow-hidden pb-[17px]">
          <View className="absolute top-5 right-[35px]">
            <Text className="text-[38px]">☀️</Text>
          </View>

          <View className="flex-row items-end justify-center bg-[#B6D0A9] w-full h-[115px] rounded-t-[100px] pb-3">
            <Text className="text-[34px] mx-[5px]">🌾</Text>
            <Text className="text-[34px] mx-[5px]">🌱</Text>
            <Text className="text-[34px] mx-[5px]">🌿</Text>
            <Text className="text-[34px] mx-[5px]">🌱</Text>
            <Text className="text-[34px] mx-[5px]">🌾</Text>
          </View>

          <Text className="text-[#365B40] text-xs font-semibold mt-3">
            Agricultura inteligente y sostenible
          </Text>
        </View>

        {/* PRESENTACIÓN */}
        <View className="mt-7">
          <Text className="text-[#568365] text-[11px] font-bold tracking-[1.5px]">
            AGRICULTURA DEL FUTURO
          </Text>

          <Text className="text-[#173D2B] text-[29px] leading-[36px] font-bold mt-3">
            Adapta tus cultivos a las condiciones de tu terreno
          </Text>

          <Text className="text-[#68756B] text-sm leading-[22px] mt-[13px]">
            AgroCycle combina información ambiental y datos locales para
            ayudarte a comparar opciones de rotación de cultivos y tomar mejores
            decisiones para tu terreno.
          </Text>
        </View>

        {/* BENEFICIOS */}
        <View className="flex-row mt-[22px] gap-[10px]">
          <View className="flex-1 bg-[#E8EFE4] rounded-[13px] p-3 items-center">
            <Text className="text-[23px]">🌦️</Text>
            <Text className="text-[#365B40] text-[11px] font-semibold mt-[7px] text-center">
              Datos ambientales
            </Text>
          </View>

          <View className="flex-1 bg-[#E8EFE4] rounded-[13px] p-3 items-center">
            <Text className="text-[23px]">🌱</Text>
            <Text className="text-[#365B40] text-[11px] font-semibold mt-[7px] text-center">
              Rotación de cultivos
            </Text>
          </View>
        </View>

        {/* BOTONES */}
        <View className="mt-[27px] gap-3">
          <Pressable
            className="bg-[#24583A] p-[17px] rounded-[13px] items-center justify-center flex-row"
            onPress={() => router.push("/registro" as any)}
          >
            <Text className="text-white text-base font-bold">Comenzar</Text>
            <Text className="text-white text-[20px] absolute right-[20px]">
              →
            </Text>
          </Pressable>

          <Pressable
            className="p-[15px] rounded-[13px] border-[1.5px] border-[#24583A] items-center"
            onPress={() => router.push("/login" as any)}
          >
            <Text className="text-[#24583A] text-sm font-semibold">
              Ya tengo una cuenta
            </Text>
          </Pressable>
        </View>

        <Text className="text-[#89958A] text-[11px] text-center mt-[25px]">
          AgroCycle · Cultivando un futuro sostenible
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
