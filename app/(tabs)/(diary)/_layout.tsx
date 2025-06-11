import { Stack } from 'expo-router'
import { get, post, getErrorMessage } from '@/services/utils'

export default function DiaryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="student/[id]" />
      <Stack.Screen name="create_update/[id]" />
    </Stack>
  )
}
