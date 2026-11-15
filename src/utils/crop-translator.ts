const cropTranslations: Record<string, string> = {
  maize: "Maíz",
  bean: "Frijol",
  squash: "Calabaza",
  sorghum: "Sorgo",
};

export function translateCrop(cropId: string): string {
  return cropTranslations[cropId.toLowerCase()] ?? cropId;
}
