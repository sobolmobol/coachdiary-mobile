import { Stack, useRouter, useSegments } from 'expo-router'
import React, { useEffect, useState } from 'react'
import '@/global.css'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { getIsLoggedInState } from '@/services/user'
import { get, getErrorMessage } from '@/services/utils'
import { ProfileResponse } from '@/types/types'
import { Alert } from 'react-native'
import { setItem, getItem } from '@/store/asyncStorage'

export default function RootLayout() {
  const segments = useSegments()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>()
  async function getProfileAndStoreRole() {
    try {
      const response = await get('/profile/')
      if (response.ok) {
        const data: ProfileResponse = await response.json()
        setItem('role', data.role)
        setItem('user_id', data.id.toString())
      } else {
        Alert.alert('Ошибка', getErrorMessage(response.json()))
      }
    } catch {
      Alert.alert(
        'Ошибка',
        'Произошла ошибка во время отправки данных, попробуйте еще раз'
      )
    }
  }
  useEffect(() => {
    const checkAuthState = async () => {
      const loggedIn = await getIsLoggedInState()
      setIsLoggedIn(loggedIn)
      if (!loggedIn && segments[0] !== 'login' && segments[0] !== 'register' && segments[0] !== 'join_code') {
        router.replace('/login')
      } else if (loggedIn) {
        await getProfileAndStoreRole()
      }
    }
    checkAuthState()
  }, [segments])
  return (
    <GluestackUIProvider mode="light">
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register/[code]" options={{ headerShown: false }} />
        <Stack.Screen name="join_code" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  )
}
