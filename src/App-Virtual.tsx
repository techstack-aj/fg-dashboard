import { useMemo, useState, useEffect, useCallback } from "react";
import AddIndexDialog from "./components/AddIndexDialog";
import { useIndices } from "./store/indices";
import IndexCard from "./components/IndexCard";
import VirtualGrid from "./components/VirtualGrid";
import CsvImport from "./components/CsvImport";
import { exportAllAsCSV } from "./utils/export";
import { useTheme } from "./context/ThemeContext";
import { INDEX_CATEGORIES, getCategoryTranslationKey } from "./config/categories";
import DashboardToggle from "./components/DashboardToggle";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function AppVirtual() {
  const { t, i18n } = useTranslation();
  const { items, addIndex, removeIndex, recompute, undo, redo } = useIndices();
  const [query, setQuery] = useState("");
  const [range, setRange] = useState<"7" | "30" | "90">("30");
  const [category, setCategory] = useState<"ALL" | string>("ALL");
  const [gauge, setGauge] = useState<"svg" | "radial">("svg");
  const { theme, setTheme } = useTheme();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleRemoveIndex = useCallback((id: string) => {
    removeIndex(id);
  }, [removeIndex]);

  const filtered = useMemo(() => {
    return items.filter(
      (i) =>
        (category === "ALL" || i.category === category) &&
        (i.name.toLowerCase().includes(query.toLowerCase()) ||
          i.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
    );
  }, [items, query, category]);

  const handelRemoveAll = () => {
    const count = items.length;
    if (window.confirm(t("delete_all_confirm"))) {
      items.forEach(i => removeIndex(i.id));
      alert(t("delete_success", { count }));
      setLastUpdate(new Date());
    }
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
}, [theme]);

  return (
  <div className="max-w-6xl mx-auto p-6 space-y-6 bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">{t("fear_greed_dashboard")} ({t("virtualized_list")})</h1>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          {category === "ALL" 
            ? t("indices_found", { count: items.length })
            : t("indices_filtered", { filtered: filtered.length, total: items.length })
          }
        </span>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
        >
          {theme === "dark" ? t("switch_light") : t("switch_dark")}
        </button>
        <div className="ml-auto flex items-center gap-2 flex-wrap">
          <LanguageSwitcher />
          <button
            onClick={undo}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
            title={t("undo")}
          >
            {t("undo")}
          </button>
          <button
            onClick={redo}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
            title={t("redo")}
          >
            {t("redo")}
          </button>
          <select
            value={gauge}
            onChange={(e) => setGauge(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          >
            <option value="svg">{t("gauge_svg")}</option>
            <option value="radial">{t("gauge_radial")}</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          >
            <option value="ALL">{t("all_categories")}</option>
            {INDEX_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {t(getCategoryTranslationKey(cat))}
              </option>
            ))}
          </select>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search_placeholder")}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          />
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          >
            <option value="7">{t("7_days")}</option>
            <option value="30">{t("30_days")}</option>
            <option value="90">{t("90_days")}</option>
          </select>
          <button
            onClick={() => {
              recompute(undefined);
              setLastUpdate(new Date());
            }}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          >
            {t("recompute")}
          </button>
          <AddIndexDialog onAdd={addIndex} />
          <CsvImport />
          <button
            onClick={() => {
              exportAllAsCSV(items);
              alert(t("export_success", { count: items.length }));
            }}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          >
            {t("export_csv")}
          </button>
          <button
            onClick={() => handelRemoveAll()}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          >
            {t("delete_all")}
          </button>
        </div>
      </header>

      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {t("last_updated", { 
          date: lastUpdate.toLocaleDateString(i18n.language, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        })}
      </div>

      <div className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
        {t("indices_found", { count: filtered.length })}
      </div>

      <VirtualGrid
        items={filtered}
        onRemove={handleRemoveIndex}
        range={range}
        gauge={gauge}
      />

      {filtered.length === 0 && (
        <div className="text-zinc-400">
          Keine Einträge – füge oben einen neuen Index hinzu.
        </div>
      )}

      <footer className="text-xs text-zinc-500 pt-6">
        Dummy-Daten & FGI-Formel nur zu Demonstrationszwecken. Später per API
        ersetzbar.
      </footer>
      
      <DashboardToggle />
    </div>
  );
}
