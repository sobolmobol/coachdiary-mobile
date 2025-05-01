import { Stack, useRouter, useSegments } from 'expo-router'
import React, { useEffect, useState } from 'react'
import '@/global.css'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getIsLoggedInState } from '@/services/user'

export default function RootLayout() {
  const segments = useSegments()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>()
  useEffect(() => {
    const checkAuthState = async () => {
      const loggedIn = await getIsLoggedInState()
      setIsLoggedIn(loggedIn)
      if (!loggedIn  && segments[0] !== 'login' && segments[0] !== 'register') {
        router.replace('/login')
      }
    }
    checkAuthState()
  }, [segments])
  return (
    <GluestackUIProvider mode="light">
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  )
}
