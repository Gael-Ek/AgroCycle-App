import { RotationService } from "@/services/rotation.service";
import { useQuery } from "@tanstack/react-query";

export const rotationKeys = {
  all: ["rotations"] as const,
  strategy: (targetCrop: string) => [...rotationKeys.all, targetCrop] as const,
};

export function useGetRotationStrategy(
  targetCrop: string,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: rotationKeys.strategy(targetCrop),
    queryFn: () => RotationService.getStrategy(targetCrop),
    enabled: Boolean(targetCrop) && enabled,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });
}
