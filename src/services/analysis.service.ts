import { api } from "@/lib/apiClient";
import type {
  ParcelAnalysisRequest,
  ParcelAnalysisResponse,
} from "@/types/analysis";

export const AnalysisService = {
  async createAnalysis(
    payload: ParcelAnalysisRequest,
  ): Promise<ParcelAnalysisResponse> {
    const { data } = await api.post<ParcelAnalysisResponse>(
      "/analysis/",
      payload,
    );

    return data;
  },
};
