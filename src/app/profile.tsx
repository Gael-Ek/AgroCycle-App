import { useLogout } from "@/hooks/use-auth";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore((state) => state);
  const logoutMutation = useLogout();

  // Si está cargando la sesión, mostramos un indicador de carga para evitar rebotes
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#F4F7F0] justify-center items-center">
        <ActivityIndicator size="large" color="#245238" />
      </SafeAreaView>
    );
  }

  // Si no hay usuario, regresamos al login o dashboard
  if (!user) {
    router.replace("/");
    return null;
  }

  const displayName = user?.user_metadata?.display_name || "Usuario";
  const email = user?.email || "correo@ejemplo.com";
  const initial = displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.replace("/login");
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F4F7F0]">
      <StatusBar barStyle="dark-content" />

      {/* Header con botón de regresar */}
      <View className="flex-row items-center px-[22px] pt-[15px] pb-5">
        <Pressable
          onPress={() => router.back()}
          className="w-[40px] h-[40px] bg-[#EAF3E9] rounded-full justify-center items-center mr-3 active:opacity-80"
        >
          <Text className="text-[#245238] text-[20px] font-bold">‹</Text>
        </Pressable>
        <Text className="text-[21px] font-bold text-[#245238]">Mi Perfil</Text>
      </View>

      <View className="px-5 items-center mt-4">
        <View className="w-[86px] h-[86px] rounded-[43px] bg-[#DCEBDD] justify-center items-center mb-4 shadow-sm">
          <Text className="text-[#245238] font-bold text-[36px]">
            {initial}
          </Text>
        </View>

        <Text className="text-[22px] font-bold text-[#245238]">
          {displayName}
        </Text>
        <Text className="text-[#819083] text-xs mt-1">
          Miembro de AgroCycle
        </Text>
      </View>

      {/* Tarjeta de Datos */}
      <View className="bg-white mx-5 mt-6 p-5 rounded-[20px] shadow-sm elevation-2">
        <Text className="text-[#28533A] text-base font-bold mb-4">
          Información de la cuenta
        </Text>

        <View className="mb-4 border-b border-[#F0F4EF] pb-3">
          <Text className="text-[#849184] text-xs">Nombre completo</Text>
          <Text className="text-[#245238] text-sm font-semibold mt-1">
            {displayName}
          </Text>
        </View>

        <View className="mb-4 border-b border-[#F0F4EF] pb-3">
          <Text className="text-[#849184] text-xs">Correo electrónico</Text>
          <Text className="text-[#245238] text-sm font-semibold mt-1">
            {email}
          </Text>
        </View>

        <View className="mb-2">
          <Text className="text-[#849184] text-xs">Contraseña</Text>
          <Text className="text-[#245238] text-sm font-semibold mt-1 tracking-widest">
            ••••••••••••
          </Text>
        </View>
      </View>

      {/* Botón de Cerrar Sesión */}
      <View className="px-5 mt-auto mb-6">
        <Pressable
          onPress={handleLogout}
          disabled={logoutMutation.isPending}
          className="bg-[#D9534F] py-4 rounded-[16px] items-center justify-center shadow-sm active:opacity-90"
        >
          <Text className="text-white font-bold text-base">
            {logoutMutation.isPending ? "Cerrando sesión..." : "Cerrar sesión"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
