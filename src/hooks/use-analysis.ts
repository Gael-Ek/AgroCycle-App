import { AnalysisService } from "@/services/analysis.service";
import { useMutation } from "@tanstack/react-query";

export function useCreateParcelAnalysis() {
  return useMutation({
    mutationFn: AnalysisService.createAnalysis,
  });
}
