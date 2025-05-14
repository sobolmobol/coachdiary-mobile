import {
  TokenRequest,
  CreateUserRequest,
  TokenRefreshRequest,
  TokenRevokeRequest,
} from '@/types/types'
import { getItem, setItem, removeItem } from '@/store/secureStorage'
import { Router } from 'expo-router'
import { Alert } from 'react-native'
import { getErrorMessage } from '@/services/utils'

export async function setIsLoggedInState(isLoggedIn: boolean) {
  setItem('isLoggedIn', String(isLoggedIn))
}
export const getIsLoggedInState = async (): Promise<boolean> => {
  const isLoggedIn = await getItem('isLoggedIn')
  return isLoggedIn === 'true'
}

function encodeFormBody(req: Record<string, string>): string {
  const formBody: string[] = []

  for (const property in req) {
    const encodedKey = encodeURIComponent(property)
    const encodedValue = encodeURIComponent(req[property])
    formBody.push(`${encodedKey}=${encodedValue}`)
  }

  return formBody.join('&')
}

export async function login(email: string, password: string, router: Router) {
  try {
    const req: TokenRequest = {
      grant_type: 'password',
      username: email,
      password: password,
      client_id: process.env.EXPO_PUBLIC_CLIENT_ID ?? '',
    }

    const response = await fetch(
      process.env.EXPO_PUBLIC_API_BASE + '/o/token/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: req ? encodeFormBody(req) : undefined,
      }
    )
    const data = await response.json()
    if (response.ok) {
      await setItem('accessToken', data.access_token)
      await setItem('refreshToken', data.refresh_token)
      await setIsLoggedInState(true)
      router.replace('/')
      return data
    } else {
      Alert.alert('Ошибка', getErrorMessage(await response.json()))
    }
  } catch {
    Alert.alert('Ошибка', 'Произошла ошибка во время отправки данных, попробуйте еще раз')
  }
}
export async function refreshToken(router: Router) {
  try {
    const refreshToken = await getItem('refreshToken')
    if (refreshToken) {
      const req: TokenRefreshRequest = {
        grant_type: 'refresh_token',
        client_id: process.env.EXPO_PUBLIC_CLIENT_ID ?? '',
        refresh_token: String(refreshToken),
      }
      const response = await fetch(
        process.env.EXPO_PUBLIC_API_BASE + '/o/token/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: req ? encodeFormBody(req) : undefined,
        }
      )
      const data = await response.json()
      if (response.ok) {
        await setItem('accessToken', data.access_token)
        await setItem('refreshToken', data.refresh_token)
        return data.access_token
      } else {
        Alert.alert('Ошибка', getErrorMessage(await response.json()))
      }
    } else {
      logout(router)
      console.log('Предупреждение', 'Сессия истекла, необходимо перезойти в аккаунт')
    }
  } catch {
    Alert.alert('Ошибка', 'Произошла ошибка во время отправки данных, попробуйте еще раз')
  }
}

export async function logout(router: Router) {
  try {
    const token = await getItem('accessToken')
    if (token === null) {
      await removeItem('accessToken')
      await removeItem('refreshToken')
      await setIsLoggedInState(false)
      router.replace('/login')
      return
    }
    const req: TokenRevokeRequest = {
      client_id: process.env.EXPO_PUBLIC_CLIENT_ID ?? '',
      token: String(token),
    }
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_BASE + '/o/revoke_token/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: req ? encodeFormBody(req) : undefined,
      }
    )
    const data =
      response.ok &&
      response.headers.get('Content-Type')?.includes('application/json')
        ? await response.json()
        : null
    if (response.ok) {
      await removeItem('accessToken')
      await removeItem('refreshToken')
      await setIsLoggedInState(false)
      router.replace('/login')
      return data
    } else {
      Alert.alert('Ошибка', getErrorMessage(await response.json()))
    }
  } catch {
    Alert.alert('Ошибка', 'Произошла ошибка во время отправки данных, попробуйте еще раз')
  }
}

export async function signUp(req: CreateUserRequest, router: Router) {
  try {
    if (!req) {
      console.log('Пустое тело запроса')
      return
    }
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_BASE + '/create-user/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: req ? JSON.stringify(req) : undefined,
      }
    )
    if (response.ok) {
      Alert.alert(
        'Вы успешно зарегистрировались!',
        'Теперь Вы можете войти в аккаунт!'
      )
      router.navigate('/login')
    } else {
      Alert.alert('Ошибка', getErrorMessage(await response.json()))
    }
  } catch {
    Alert.alert('Ошибка', 'Произошла ошибка во время отправки данных, попробуйте еще раз')
  }
}
