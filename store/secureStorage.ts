import * as SecureStore from 'expo-secure-store'

export const setItemSec = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error setting item:', error)
  }
}

export const getItemSec = async (key: string) => {
  try {
    const value = await SecureStore.getItemAsync(key)
    return value != null ? JSON.parse(value) : null
  } catch (error) {
    console.error('Error getting item:', error)
    return null
  }
}

export const removeItemSec = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key)
  } catch (error) {
    console.error('Error removing item:', error)
  }
}
