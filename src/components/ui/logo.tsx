import { Text, View } from "react-native";

export const Logo = ({ textColor }: { textColor?: string }) => {
  return (
    <View>
      <Text className={`text-3xl ${textColor || "text-[#315D40]"} font-bold`}>
        🌱 AgroCycle
      </Text>
      <Text className="text-[#819083] text-xs mt-[3px]">
        Agricultura inteligente
      </Text>
    </View>
  );
};
