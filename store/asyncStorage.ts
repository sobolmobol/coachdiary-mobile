import AsyncStorage from '@react-native-async-storage/async-storage'

export const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error setting item:', error)
  }
}

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value != null ? JSON.parse(value) : null
  } catch (error) {
    console.error('Error getting item:', error)
    return null
  }
}

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing item:', error)
  }
}

export const mergeItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error merging item:', error)
  }
}

export const clear = async () => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error)
  }
}

export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys()
  } catch (error) {
    console.error('Error getting all keys:', error)
    return []
  }
}

export const getAllItems = async (): Promise<Record<string, unknown>> => {
  try {
    const keys: string[] = (await AsyncStorage.getAllKeys()) as string[]
    const items: [string, string | null][] = (await AsyncStorage.multiGet(
      keys
    )) as [string, string | null][]

    return items.reduce<Record<string, unknown>>(
      (accumulator, [key, value]) => {
        accumulator[key] = value ? JSON.parse(value) : null
        return accumulator
      },
      {}
    )
  } catch (error) {
    console.error('Error getting all items:', error)
    return {}
  }
}
