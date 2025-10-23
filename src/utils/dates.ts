export function toISO(d: Date): string {
  return d.toISOString().split("T")[0];
}

export function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}