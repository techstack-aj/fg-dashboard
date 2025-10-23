import React, { useMemo, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import AddIndexDialog from "./components/AddIndexDialog";
import { useIndices } from "./store/indices";
import IndexCard from "./components/IndexCard";
import CsvImport from "./components/CsvImport";
import { exportAllAsCSV } from "./utils/export";
import { useTheme } from "./context/ThemeContext";
import { ALL_CATEGORIES, INDEX_CATEGORIES } from "./config/categories";


export default function App() {
  const { items, addIndex, removeIndex, recompute, undo, redo } = useIndices();
  const [query, setQuery] = useState("");
  const [range, setRange] = useState<"7" | "30" | "90">("30");
  const [category, setCategory] = useState<"ALL" | string>("ALL");
  const [gauge, setGauge] = useState<"svg" | "radial">("svg");
  const { theme, setTheme } = useTheme();

  const filtered = useMemo(() => {
    return items.filter(
      (i) =>
        (category === "ALL" || i.category === category) &&
        (i.name.toLowerCase().includes(query.toLowerCase()) ||
          i.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
    );
  }, [items, query, category]);

  const handelRemoveAll = () => {
    if (window.confirm("Alle Einträge wirklich entfernen?")) {
      items.forEach(i => removeIndex(i.id));
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
        <h1 className="text-2xl font-bold">Fear & Greed Dashboard</h1>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
        >
          {theme === "dark" ? "⚪ Switch Light" : "⚫ Switch Dark"}
        </button>
        <div className="ml-auto flex items-center gap-2 flex-wrap">
          <button
            onClick={undo}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
            title="Rückgängig (Undo)"
          >
            ↶ Undo
          </button>
          <button
            onClick={redo}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
            title="Wiederholen (Redo)"
          >
            ↷ Redo
          </button>
          <select
            value={gauge}
            onChange={(e) => setGauge(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          >
            <option value="svg">Gauge: SVG</option>
            <option value="radial">Gauge: Radial</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          >
            <option value="ALL">{ALL_CATEGORIES}</option>
            {INDEX_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suchen…"
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          />
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          >
            <option value="7">7 Tage</option>
            <option value="30">30 Tage</option>
            <option value="90">90 Tage (Dummy)</option>
          </select>
          <button
            onClick={() => recompute()}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          >
            Neu berechnen
          </button>
          <AddIndexDialog onAdd={addIndex} />
          <CsvImport />
          <button
            onClick={() => exportAllAsCSV(items)}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          >
            Export CSV
          </button>
          <button
            onClick={() => handelRemoveAll()}
            className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          >
            Alles entfernen
          </button>
        </div>
      </header>

      <main className="grid md:grid-cols-2 gap-4">
        {filtered.map((i) => (
          <IndexCard
            key={i.id}
            item={i}
            onRemove={removeIndex}
            range={range}
            gauge={gauge}
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-zinc-400">
            Keine Einträge – füge oben einen neuen Index hinzu.
          </div>
        )}
      </main>

      <footer className="text-xs text-zinc-500 pt-6">
        Dummy-Daten & FGI-Formel nur zu Demonstrationszwecken. Später per API
        ersetzbar.
      </footer>
    </div>
  );
}
