import { Alert } from 'react-native';
import {refreshToken} from './user'
import { getItem, setItem } from '@/store/secureStorage'
import { router } from 'expo-router';

const apiBase = process.env.EXPO_PUBLIC_API_BASE;

async function getAccessToken(){
  return await getItem('accessToken');
}

export async function get(
  url: string,
  data?: Record<string | number, unknown | unknown[]>
): Promise<Response> {
  const urlObj = new URL(apiBase + url);
  for (const key in data) {
    if (Array.isArray(data[key])) {
      for (const item of data[key] as unknown[]) {
        urlObj.searchParams.append(key, item?.toString() ?? '')
      }
    } else {
      urlObj.searchParams.append(key, data[key]?.toString() ?? '')
    }
  }
  const accessToken = await getAccessToken();
  const response = await fetch(urlObj.toString(), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  if(response.status===401){
    Alert.alert("Время перезойти в аккаунт!");
    router.replace('/login');
  } 
  return response;
}

export async function post(
  url: string,
  data?: Record<string | number, unknown> | unknown[]
): Promise<Response> {
  const accessToken = await getAccessToken();
  const response = await fetch(apiBase + url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  })
  if(response.status===401){
    Alert.alert("Время перезойти в аккаунт!");
    router.replace('/login');
  } 
  return response;
}

export async function put(
  url: string,
  data?: Record<string | number, unknown>
): Promise<Response> {
  const accessToken = await getAccessToken();
  const response = await fetch(apiBase + url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  })
  if(response.status===401){
    Alert.alert("Время перезойти в аккаунт!");
    router.replace('/login');
  } 
  return response;
}

export async function patch(
  url: string,
  data?: Record<string | number, unknown>
): Promise<Response> {
  const accessToken = await getAccessToken();
  const response = await fetch(apiBase + url, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  })
  if(response.status===401){
    Alert.alert("Время перезойти в аккаунт!");
    router.replace('/login');
  } 
  return response;
}

export async function del(url: string): Promise<Response> {
  const accessToken = await getAccessToken();
  const response = await fetch(apiBase + url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  if(response.status===401){
    Alert.alert("Время перезойти в аккаунт!");
    router.replace('/login');
  } 
  return response;
}

export function flattenObject(obj: any, parentKey: string = '', result: Record<string, any> = {}): Record<string, any> {
  if (typeof obj === 'string' && parentKey === '') {
    return {obj}
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}[${key}]` : key
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result)
      } else if (Array.isArray(obj[key])) {
        obj[key].forEach((item: any, index: number) => {
          const arrayKey = `${newKey}[${index}]`
          if (typeof item === 'object') {
            flattenObject(item, arrayKey, result)
          } else {
            result[arrayKey] = item
          }
        })
      } else {
        result[newKey] = obj[key]
      }
    }
  }
  return result
}

export function getErrorMessage(error: any): string {
  if ('details' in error) {
    return Object.values(flattenObject(error.details)).join(' ')
  }
  if ('errors' in error) {
    return Object.values(flattenObject(error.errors)).join(' ')
  }
  if ('детали' in error) {
    return Object.values(flattenObject(error.детали)).join(' ')
  }
  if ('Детали' in error) {
    return Object.values(flattenObject(error.Детали)).join(' ')
  }
  return 'Неизвестная ошибка'
}