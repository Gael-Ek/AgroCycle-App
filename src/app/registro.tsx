import { useRegister } from "@/hooks/use-auth";
import { RegisterFormData, registerSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegistroScreen() {
  const router = useRouter();
  const registerMutation = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isLoading = registerMutation.isPending;

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F4F7F0]">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerClassName="grow p-6">
          <Pressable className="mb-[18px]" onPress={() => router.back()}>
            <Text className="text-[#315D40] text-base font-semibold">
              ‹ Volver
            </Text>
          </Pressable>

          <View className="items-center mb-[25px]">
            <Text className="text-[48px]">🌱</Text>
            <Text className="text-[29px] font-bold text-[#245238] mt-[5px]">
              AgroCycle
            </Text>
            <Text className="text-[13px] text-[#718575] mt-[5px] text-center">
              Únete a una agricultura más inteligente
            </Text>
          </View>

          <View className="bg-white p-[22px] rounded-[22px] shadow-sm">
            <Text className="text-[26px] font-bold text-[#214A32] mb-2">
              Crear cuenta
            </Text>
            <Text className="text-[#78877B] text-sm leading-[21px] mb-[18px]">
              Regístrate para comenzar a gestionar tus terrenos y cultivos.
            </Text>

            <Text className="text-[#315D40] font-semibold mb-2 mt-3">
              Nombre completo
            </Text>
            <Controller
              control={control}
              name="name" // O el nombre del campo en tu schema
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="bg-[#F4F7F0] border border-[#DCE7DC] rounded-xl p-[14px] text-[15px] text-[#244631]"
                  placeholder="Tu nombre"
                  placeholderTextColor="#9BA99D"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.name && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </Text>
            )}

            {/* CAMPO: Correo electrónico */}
            <Text className="text-[#315D40] font-semibold mb-2 mt-3">
              Correo electrónico
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="bg-[#F4F7F0] border border-[#DCE7DC] rounded-xl p-[14px] text-[15px] text-[#244631]"
                  placeholder="ejemplo@correo.com"
                  placeholderTextColor="#9BA99D"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </Text>
            )}

            {/* CAMPO: Contraseña */}
            <Text className="text-[#315D40] font-semibold mb-2 mt-3">
              Contraseña
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="bg-[#F4F7F0] border border-[#DCE7DC] rounded-xl p-[14px] text-[15px] text-[#244631]"
                  placeholder="Mínimo 8 caracteres"
                  placeholderTextColor="#9BA99D"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </Text>
            )}

            {/* CAMPO: Confirmar contraseña */}
            <Text className="text-[#315D40] font-semibold mb-2 mt-3">
              Confirmar contraseña
            </Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="bg-[#F4F7F0] border border-[#DCE7DC] rounded-xl p-[14px] text-[15px] text-[#244631]"
                  placeholder="Repite tu contraseña"
                  placeholderTextColor="#9BA99D"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
            />
            {errors.confirmPassword && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </Text>
            )}

            {/* BOTÓN DE REGISTRO */}
            <Pressable
              className="bg-[#2F7048] p-[17px] rounded-xl items-center mt-[25px]"
              onPress={() => handleSubmit(onSubmit)()}
              disabled={isLoading}
            >
              <Text className="text-white font-bold text-base">
                {isLoading ? <ActivityIndicator /> : "Registrarme"}
              </Text>
            </Pressable>

            <View className="flex-row justify-center flex-wrap mt-[22px]">
              <Text className="text-[#718575]">¿Ya tienes una cuenta?</Text>
              <Pressable onPress={() => router.push("/login" as any)}>
                <Text className="text-[#2F7048] font-bold">Iniciar sesión</Text>
              </Pressable>
            </View>
          </View>

          <Text className="text-center text-[#8A998D] text-xs mt-[25px] mb-[15px]">
            AgroCycle · Cultivando un futuro sostenible
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
