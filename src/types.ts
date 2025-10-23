import { Category, IndexCategory } from "./config/categories";

export type ISODate = string;

export interface IndexPoint {
  date: string;   // "YYYY-MM-DD"
  value: number;  // 0..100
}

export interface IndexItem {
  id: string;
  name: string;
  category: Category;
  tags: string[];
  value: number;
  history: IndexPoint[];
}

export interface NewIndexPayload {
  name: string;
  category: IndexCategory;
  tags: string;
}
