import { Tabs } from 'expo-router';

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#24583A',
        tabBarInactiveTintColor: '#89958A',
        tabBarStyle: {
          backgroundColor: '#F4F7F0',
          borderTopColor: '#E2EAD E',
        },
        tabBarLabelStyle: {
          fontWeight: '600',
        },
      }}
    >
       <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarLabel: 'Inicio',
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Inicio',
          tabBarLabel: 'Inicio',
        }}
      />

      <Tabs.Screen
        name="terrenos"
        options={{
          title: 'Terrenos',
          tabBarLabel: 'Terrenos',
        }}
      />
    </Tabs>
  );
}