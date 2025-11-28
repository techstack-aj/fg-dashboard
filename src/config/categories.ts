export const ALL_CATEGORIES = "Alle Kategorien";

export const CATEGORIES = [
  ALL_CATEGORIES,
  "Aktien",
  "Indizes",
  "Crypto",
  "Rohstoffe",
  "Custom",
  // ...weitere Kategorien
] as const;

export type Category = (typeof CATEGORIES)[number];
export type IndexCategory = Exclude<Category, typeof ALL_CATEGORIES>;

// Helper, falls Dropdown ohne "Alle Kategorien" arbeiten soll
export const INDEX_CATEGORIES = CATEGORIES.filter(
  (category) => category !== ALL_CATEGORIES
);

// Helper function to get translation key for category
export const getCategoryTranslationKey = (category: string): string => {
  const categoryMap: Record<string, string> = {
    "Aktien": "category_aktien",
    "Indizes": "category_indizes",
    "Crypto": "category_crypto",
    "Rohstoffe": "category_rohstoffe",
    "Custom": "category_custom",
  };
  return categoryMap[category] || category;
};