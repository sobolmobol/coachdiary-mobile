import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = true; // Здесь проверьте состояние авторизации

    // Если пользователь не авторизован и не находится на страницах входа или регистрации
    if (!isLoggedIn && segments[0] !== "login" && segments[0] !== "register") {
      router.replace("/login");
    }
  }, [segments]);
  return <GluestackUIProvider mode="light" >
      <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
  </GluestackUIProvider>;
}
