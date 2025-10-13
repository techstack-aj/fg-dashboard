// --- filepath: src/types.ts
export type ISODate = string;

export type AssetCategory =
  | "Tech-Aktien"
  | "Altcoins"
  | "Cannabis-Aktien"
  | "Index"
  | "Custom";

export interface IndexPoint {
  date: string;   // "YYYY-MM-DD"
  value: number;  // 0..100
}

export interface IndexItem {
  id: string;
  name: string;
  category: string;
  tags: string[];
  value: number;
  history: IndexPoint[];
}

export interface NewIndexPayload {
  name: string;
  category: AssetCategory | "Custom";
  tags: string;
}

// --- filepath: src/utils/dates.ts
export function toISO(d: Date): string {
  return d.toISOString().split("T")[0];
}

export function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}
