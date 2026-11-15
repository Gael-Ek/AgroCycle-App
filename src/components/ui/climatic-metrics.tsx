import { Text, View } from "react-native";

type ClimateMetricProps = {
  emoji: string;
  label: string;
  value: string;
};

export function ClimateMetric({ emoji, label, value }: ClimateMetricProps) {
  return (
    <View className="mb-3 flex-row items-center rounded-2xl bg-[#F4F7F0] p-3">
      <Text className="text-2xl">{emoji}</Text>

      <View className="ml-3 flex-1">
        <Text className="text-xs text-gray-500">{label}</Text>

        <Text className="mt-1 text-lg font-bold text-[#245238]">{value}</Text>
      </View>
    </View>
  );
}
