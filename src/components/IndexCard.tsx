import React, { useMemo, useState } from "react";
import { IndexItem } from "../types";
import Barometer from "./Barometer";
import GaugeRadial from "./GaugeRadial";
import IndexChart from "./IndexChart";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCategoryTranslationKey } from "../config/categories";

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
  const { t } = useTranslation();
  const data = useMemo(() => {
    const n = Number(range);
    if (!Number.isFinite(n)) return item.history;
    return item.history.slice(-n);
  }, [item.history, range]);
  const { theme } = useTheme();
  const [showAllTags, setShowAllTags] = useState(false);
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/index/' + item.id)} className="rounded-2xl border bg-white border-zinc-200 text-zinc-900 dark:bg-zinc-900/40 dark:border-zinc-800 dark:text-zinc-100 p-4 flex gap-4 cursor-pointer">
      <div className="flex flex-col justify-between">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          <div>{t(getCategoryTranslationKey(item.category))}</div>
          <div className="relative">
            <div className="flex items-center gap-1">
              <span className="truncate max-w-[140px]">
                {item.tags.slice(0, 2).join(", ")}
              </span>
              {item.tags.length > 2 && (
                <div className="relative group">
                  <button
                    onClick={() => setShowAllTags(!showAllTags)}
                    className="text-xs px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 flex-shrink-0 border border-blue-300 dark:border-blue-700"
                  >
                    +{item.tags.length - 2}
                  </button>
                  <div className="absolute left-0 top-full mt-1 hidden group-hover:block z-20 bg-zinc-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none">
                    {item.tags.slice(2).join(", ")}
                  </div>
                </div>
              )}
            </div>
            {showAllTags && item.tags.length > 2 && (
              <div className="absolute top-0 left-0 z-10 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow-lg p-3 min-w-[200px]">
                <div className="mb-2">{item.tags.join(", ")}</div>
                <button
                  onClick={() => setShowAllTags(false)}
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline text-xs"
                >
                  {t("show_less")}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="text-4xl font-bold">{item.fgi}</div>
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
            {t("remove")}
          </button>
        )}
      </div>
      <div className="flex-1">
        <IndexChart data={data} height={180} />
      </div>
    </div>
  );
}
