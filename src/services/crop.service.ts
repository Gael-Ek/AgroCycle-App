import { api } from "@/lib/apiClient";
import type { Crop } from "@/types/crop";

export const CropService = {
  async getCrops(): Promise<Crop[]> {
    const { data } = await api.get<Crop[]>("/crops/");
    return data;
  },
};
