import { useLogin } from "@/hooks/use-auth";
import { LoginFormData, loginSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F4F7F0]">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
          <Pressable className="mb-[25px]" onPress={() => router.back()}>
            <Text className="text-[#315D40] text-base font-semibold">
              ‹ Volver
            </Text>
          </Pressable>

          <View className="items-center mb-[35px]">
            <Text className="text-[55px]">🌱</Text>
            <Text className="text-[30px] font-bold text-[#245238] mt-[5px]">
              AgroCycle
            </Text>
            <Text className="text-[13px] text-[#718575] mt-[5px]">
              Agricultura inteligente y sostenible
            </Text>
          </View>

          <View className="bg-white p-6 rounded-[22px] elevation-3 shadow-sm">
            <Text className="text-[27px] font-bold text-[#214A32] mb-2">
              ¡Bienvenido!
            </Text>
            <Text className="text-[#78877B] text-[14px] leading-[21px] mb-[25px]">
              Inicia sesión para continuar con la gestión de tus cultivos.
            </Text>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text className="text-[#315D40] font-semibold mb-2 mt-3">
                    Correo electrónico
                  </Text>
                  <TextInput
                    className="bg-[#F4F7F0] border border-[#DCE7DC] rounded-xl p-[15px] text-[15px] text-[#244631]"
                    placeholder="ejemplo@correo.com"
                    placeholderTextColor="#9BA99D"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />

                  {errors.email && <Text>{errors.email.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text className="text-[#315D40] font-semibold mb-2 mt-3">
                    Contraseña
                  </Text>
                  <TextInput
                    className="bg-[#F4F7F0] border border-[#DCE7DC] rounded-xl p-[15px] text-[15px] text-[#244631]"
                    placeholder="Ingresa tu contraseña"
                    placeholderTextColor="#9BA99D"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                  />

                  {errors.email && <Text>{errors.email.message}</Text>}
                </View>
              )}
            />

            <Pressable
              className="bg-[#2F7048] p-[17px] rounded-xl items-center mt-7"
              onPress={() => handleSubmit(onSubmit)()}
            >
              <Text className="text-white font-bold text-base">
                Iniciar sesión
              </Text>
            </Pressable>

            <View className="flex-row justify-center mt-6 flex-wrap">
              <Text className="text-[#718575]">¿No tienes una cuenta?</Text>
              <Pressable onPress={() => router.push("/registro")}>
                <Text className="text-[#2F7048] font-bold"> Regístrate</Text>
              </Pressable>
            </View>
          </View>

          <Text className="text-center text-[#8A998D] text-xs mt-[30px] mb-[15px]">
            AgroCycle · Cultivando un futuro sostenible
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
