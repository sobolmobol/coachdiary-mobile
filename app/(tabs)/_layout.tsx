//import FontAwesome from '@expo/vector-icons/FontAwesome';
//import { IconSymbol } from '@/components/ui/IconSymbol';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: 'blue',     
      tabBarLabelStyle: {
        fontSize: 14,
        fontFamily: 'Roboto',
        fontWeight: 300,
      },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Дневник',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="notebook-edit" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="classes"
        options={{
          title: 'Мои классы',
          tabBarIcon: ({ color }) => <FontAwesome6 name="people-group" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}