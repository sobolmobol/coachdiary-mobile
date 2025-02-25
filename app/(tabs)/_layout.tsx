import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native'
import { config } from '@/components/ui/gluestack-ui-provider/config';
import { vars } from 'nativewind';
//import { config } from '@/components/ui/gluestack-ui-provider/index';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  console.log(config[colorScheme ?? 'light']['--color-tertiary'])
  return (
    <Tabs screenOptions={{ 
      headerStyle: {
        backgroundColor: '#003F50',
        borderBottomLeftRadius: 8, 
        borderBottomRightRadius: 8, 
      },
      headerTitleAlign: 'center',
      headerTintColor: '#FFF3E1',
      tabBarActiveTintColor: '#E5AA7B',     
      tabBarInactiveTintColor: '#FFF3E1',
      tabBarStyle: {
        backgroundColor: '#003F50', 
        borderTopLeftRadius: 8, 
        borderTopRightRadius: 8, 
        padding: 10,  
      },
      /*tabBarActiveTintColor: `rgb(var(${config[colorScheme ?? 'light']['--color-tertiary']}))`,  
      tabBarInactiveTintColor: `rgb(var(${config[colorScheme ?? 'light']['--color-typography-0']}))`,
      tabBarStyle: {
        backgroundColor: `rgb(${config[colorScheme ?? 'light']['--color-primary']})`, 
        borderTopLeftRadius: 8, 
        borderTopRightRadius: 8, 
        padding: 10,  
      },*/
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Дневник',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="notebook-edit" size={24} color={color}  />,
        }}
      />
      <Tabs.Screen
        name="classes"
        options={{
          title: 'Мои классы',
          tabBarIcon: ({ color }) => <FontAwesome6 name="people-group" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="standards"
        options={{
          title: 'Мои нормативы',
          tabBarIcon: ({ color }) => <FontAwesome6 name="person-running" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Мой профиль',
          tabBarIcon: ({ color }) => <Ionicons name="person-sharp" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}