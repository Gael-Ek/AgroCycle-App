import { api } from "@/lib/apiClient";
import type { RotationStrategy } from "@/types/rotation";

export const RotationService = {
  async getStrategy(targetCrop: string): Promise<RotationStrategy> {
    const { data } = await api.get<RotationStrategy>("/rotations/", {
      params: {
        target_crop: targetCrop,
      },
    });

    return data;
  },
};
