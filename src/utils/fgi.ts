// src/utils/fgi.ts

export function computeFGI(seed: number): number {
  const momentum = seed * 65 + 20;
  const volFear = 100 - (seed * 30 + 10);
  const volume = seed * 40 + 5;
  const weighted = momentum * 0.5 + (100 - volFear) * 0.3 + volume * 0.2;
  return Math.max(0, Math.min(100, Math.round(weighted)));
}

export function pseudoRandom(seed: number) {
  let s = Math.sin(seed) * 10000;
  return s - Math.floor(s);
}

export function generateHistory(days = 30, baseSeed = 42) {
  const points: { date: string; value: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const seed = pseudoRandom(baseSeed + i);
    const value = computeFGI(seed);
    const d = new Date();
    d.setDate(d.getDate() - i);
    points.push({ date: d.toISOString().slice(0, 10), value });
  }
  return points;
}

/** stabiler Seed 0..1 aus Name */
export function seedFromName(name: string): number {
  let hash = 5381;
  for (let i = 0; i < name.length; i++) hash = ((hash << 5) + hash) + name.charCodeAt(i);
  const u32 = (hash | 0) >>> 0;
  return (u32 % 10000) / 10000;
}
