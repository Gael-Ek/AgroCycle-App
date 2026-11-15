export type ParcelAnalysisRequest = {
  terreno_name: string;
  municipality: string;
  country: string;
  state: string;
  latitude: number;
  longitude: number;
  area_hectares: number;
  target_crop: string;
};

export type ParcelAnalysisResponse = {
  parcel_name: string;
  estimated_area_hectares: number;
  suitability_score: number;
  recommendations: string[];
  source: string;
};
