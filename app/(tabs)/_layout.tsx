import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useUserRole } from '@/hooks/useUserRole'
//import { config } from '@/components/ui/gluestack-ui-provider/index';

export default function TabLayout() {
  const { userId, role, loading } = useUserRole()
  const router = useRouter()

  useEffect(() => {
    if (!loading && role === 'student' && userId) {
      router.replace(`/(tabs)/(diary)/student/${userId}`)
    }
  }, [role, userId, loading])

  if (loading) return null
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#003F50',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#f0f8ff',
        tabBarActiveTintColor: '#E5AA7B',
        tabBarInactiveTintColor: '#f0f8ff',
        tabBarStyle: {
          backgroundColor: '#003F50',
          padding: 10,
        },
      }}>
      <Tabs.Screen
        name="(diary)"
        options={{
          title: `${role === 'teacher' ? 'Дневник' : 'Мои результаты'}`,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="notebook-edit"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(classes)"
        options={{
          title: 'Мои классы',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="people-group" size={24} color={color} />
          ),
          href: role === 'student' ? null : '/(tabs)/(classes)'
        }}
      />
      <Tabs.Screen
        name="(standards)"
        options={{
          title: 'Мои нормативы',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="person-running" size={24} color={color} />
          ),
          href: role === 'student' ? null : '/(tabs)/(standards)'
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Мой профиль',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-sharp" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

 

