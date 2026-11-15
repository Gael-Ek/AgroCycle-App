export type RecommendedCrop = {
  crop_name: string;
  crop_family: string;
  score: number;
  benefits: string[];
  risks: string[];
};

export type RotationStrategy = {
  strategy_name: string;
  recommended_sequence: RecommendedCrop[];
  overall_score: number;
  explanation: string;
};
