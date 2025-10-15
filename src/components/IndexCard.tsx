import React, { useMemo } from "react";
import { IndexItem } from "../types";
import Barometer from "./Barometer";
import GaugeRadial from "./GaugeRadial";
import IndexChart from "./IndexChart";
import { useTheme } from "../context/ThemeContext";

interface Props {
  item: IndexItem;
  onRemove?: (id: string) => void;
  range?: "7" | "30" | "90";
  gauge?: "svg" | "radial";
}

export default function IndexCard({
  item,
  onRemove,
  range = "30",
  gauge = "svg",
}: Props) {
  const data = useMemo(() => {
    const n = Number(range);
    if (!Number.isFinite(n)) return item.history;
    return item.history.slice(-n);
  }, [item.history, range]);
  const { theme } = useTheme();

  return (
    <div className="rounded-2xl border bg-white border-zinc-200 text-zinc-900 dark:bg-zinc-900/40 dark:border-zinc-800 dark:text-zinc-100 p-4 flex gap-4">
      <div className="flex flex-col justify-between">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {item.category} · {item.tags.join(", ")}
        </div>
        {gauge === "svg" ? (
          <Barometer value={item.value} size={140} />
        ) : (
          <GaugeRadial value={item.value} />
        )}
        {onRemove && (
          <button
            onClick={() => onRemove(item.id)}
            className="mt-2 text-xs text-zinc-600 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400"
          >
            Entfernen
          </button>
        )}
      </div>
      <div className="flex-1">
        <IndexChart data={data} height={180} />
      </div>
    </div>
  );
}
