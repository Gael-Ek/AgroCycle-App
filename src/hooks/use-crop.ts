import { CropService } from "@/services/crop.service";
import { useQuery } from "@tanstack/react-query";

export const cropKeys = {
  all: ["crops"] as const,
};

export function useGetCrops() {
  return useQuery({
    queryKey: cropKeys.all,
    queryFn: CropService.getCrops,
    staleTime: 1000 * 60 * 60, // 1 hora
    retry: 1,
  });
}
