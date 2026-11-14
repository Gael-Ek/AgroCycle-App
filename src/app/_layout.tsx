import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
  useRouter,
  useSegments,
} from "expo-router";

import { useEffect } from "react";
import { ActivityIndicator, View, useColorScheme } from "react-native";

import { AppProvider } from "@/providers/AppProvider";
import { useAuthStore } from "@/stores/auth.store";
import "../../global.css";

function RootNavigator() {
  const router = useRouter();
  const segments = useSegments();

  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    if (isLoading) return;

    const currentGroup = segments[0];

    // Permitimos explícitamente estar en "profile" sin que nos expulse
    if (currentGroup === "profile") return;

    // Si existe una sesión, debe entrar a las tabs
    if (user && currentGroup !== "(tabs)") {
      router.replace("/(tabs)/dashboard");
      return;
    }

    // Si no existe sesión, no puede entrar a las tabs
    if (!user && currentGroup === "(tabs)") {
      router.replace("/");
    }
  }, [user, isLoading, segments]);

  // Esperar a que Supabase compruebe la sesión
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F4F7F0]">
        <ActivityIndicator size="large" color="#24583A" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="registro" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AppProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootNavigator />
      </ThemeProvider>
    </AppProvider>
  );
}
