export type Crop = {
  id: string;
  name: string;
  family: string;
  optimal_temp_min: number;
  optimal_temp_max: number;
  water_requirement_mm: number;
  growing_season_days: number;
  nitrogen_fixing: boolean;
  description: string;
};
