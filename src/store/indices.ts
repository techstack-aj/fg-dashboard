// src/store/indices.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ⬅️ Pfade ggf. an dein Projekt anpassen
import { computeFGI, pseudoRandom, generateHistory, seedFromName } from '../utils/fgi';
import type { IndexPoint, IndexItem } from '../types';

// ---- Types (falls noch nicht zentral vorhanden) ----
// export interface IndexPoint {
//   date: string;           // oder Date
//   value: number;
// }

// export interface IndexItem {
//   id: string;
//   name: string;
//   category: string;
//   tags: string[];
//   value: number;
//   history: IndexPoint[];
// }

type State = {
  items: IndexItem[];
  past: IndexItem[][];
  future: IndexItem[][];

  addIndex: (name: string, category: string, tags: string[]) => void;
  removeIndex: (id: string) => void;
  recompute: (id?: string) => void;
  setAll: (items: IndexItem[]) => void;
  replaceHistory: (id: string, history: IndexPoint[]) => void;
  undo: () => void;
  redo: () => void;
};

// ---- Helper, belässt History (Undo/Redo) intakt ----
type Getter = () => State;
type Setter = (partial: Partial<State>) => void;

const withHistory = (get: Getter, set: Setter, next: IndexItem[]) => {
  const { items, past } = get();
  set({ items: next, past: [...past, items], future: [] });
};

// ---- Initiale Items (dein Tech-Aktien Beispiel) ----
const initialItems: IndexItem[] = [
  {
    id: crypto.randomUUID(),
    name: 'Tech-Aktien',
    category: 'Tech-Aktien',
    tags: ['Aktien'],
    history: generateHistory(30, 202),
    value: computeFGI(pseudoRandom(202)),
  },
];

// ---- Der eigentliche Store ----
export const useIndicesStore = create<State>()(
  persist(
    (set, get) => ({
      items: initialItems,
      past: [],
      future: [],

      addIndex: (name, category, tags) => {
        const seed = seedFromName(name);
        const history = generateHistory(30, seed);
        const value = computeFGI(pseudoRandom(seed));
        const item: IndexItem = {
          id: crypto.randomUUID(),
          name,
          category,
          tags,
          value,
          history,
        };
        const next = [item, ...get().items];
        withHistory(get, set, next);
      },

      removeIndex: (id) => {
        const next = get().items.filter(i => i.id !== id);
        withHistory(get, set, next);
      },

      recompute: (id) => {
        if (!id) {
          const next = get().items.map(i => ({
            ...i,
            value: computeFGI(pseudoRandom(seedFromName(i.name))),
          }));
          withHistory(get, set, next);
          return;
        }
        const next = get().items.map(i =>
          i.id === id
            ? { ...i, value: computeFGI(pseudoRandom(seedFromName(i.name))) }
            : i
        );
        withHistory(get, set, next);
      },

      setAll: (items) => {
        withHistory(get, set, items);
      },

      replaceHistory: (id, history) => {
        const next = get().items.map(i => (i.id === id ? { ...i, history } : i));
        withHistory(get, set, next);
      },

      undo: () => {
        const { past, items, future } = get();
        if (past.length === 0) return;
        const prev = past[past.length - 1];
        set({ items: prev, past: past.slice(0, -1), future: [items, ...future] });
      },

      redo: () => {
        const { past, items, future } = get();
        if (future.length === 0) return;
        const next = future[0];
        set({ items: next, past: [...past, items], future: future.slice(1) });
      },
    }),
    { name: 'fgi-indices' }
  )
);

// am Ende von src/store/indices.ts – NACH der Definition
export const useIndices = useIndicesStore; // Alias zusätzlich exportieren
