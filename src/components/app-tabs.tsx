import { Tabs } from "expo-router";
import { HomeIcon, TerrainIcon } from "./icons";

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#24583A",
        tabBarInactiveTintColor: "#89958A",
        tabBarStyle: {
          backgroundColor: "#F4F7F0",
          borderTopColor: "#E2EAD E",
        },
        tabBarLabelStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Inicio",
          tabBarLabel: "Inicio",
          tabBarIcon: () => <HomeIcon color="#24583A" />,
        }}
      />

      <Tabs.Screen
        name="parcels"
        options={{
          title: "Terrenos",
          tabBarLabel: "Terrenos",
          tabBarIcon: () => <TerrainIcon color="#24583A" />,
        }}
      />
    </Tabs>
  );
}
