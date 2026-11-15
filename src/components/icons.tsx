import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const HomeIcon = ({ color }: { color: string }) => (
  <MaterialIcons name="home-filled" size={24} color={color || "black"} />
);

export const TerrainIcon = ({ color }: { color: string }) => (
  <MaterialIcons name="terrain" size={24} color={color || "black"} />
);
