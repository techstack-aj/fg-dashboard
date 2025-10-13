// --- filepath: src/App.tsx
import React, { useMemo, useState } from "react";
import AddIndexDialog from "./components/AddIndexDialog";
import { useIndices } from "./store/indices";
import IndexCard from "./components/IndexCard";
import CsvImport from "./components/CsvImport";
import { exportAllAsCSV } from "./utils/export";

export default function App() {
  const { items, addIndex, removeIndex, recompute, undo, redo } = useIndices();
  const [query, setQuery] = useState("");
  const [range, setRange] = useState<"7" | "30" | "90">("30");
  const [category, setCategory] = useState<"ALL" | string>("ALL");
  const [gauge, setGauge] = useState<"svg" | "radial">("svg");

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

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">Fear & Greed Dashboard</h1>
        <div className="ml-auto flex items-center gap-2 flex-wrap">
          <button
            onClick={undo}
            className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700"
            title="Rückgängig (Undo)"
          >
            ↶ Undo
          </button>
          <button
            onClick={redo}
            className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700"
            title="Wiederholen (Redo)"
          >
            ↷ Redo
          </button>
          <select
            value={gauge}
            onChange={(e) => setGauge(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700"
          >
            <option value="svg">Gauge: SVG</option>
            <option value="radial">Gauge: Radial</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700"
          >
            <option value="ALL">Alle Kategorien</option>
            <option>Tech-Aktien</option>
            <option>Altcoins</option>
            <option>Cannabis-Aktien</option>
            <option>Index</option>
            <option>Custom</option>
          </select>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suchen…"
            className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 outline-none"
          />
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700"
          >
            <option value="7">7 Tage</option>
            <option value="30">30 Tage</option>
            <option value="90">90 Tage (Dummy)</option>
          </select>
          <button
            onClick={() => recompute()}
            className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700"
          >
            Neu berechnen
          </button>
          <AddIndexDialog onAdd={addIndex} />
          <CsvImport />
          <button
            onClick={() => exportAllAsCSV(items)}
            className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700"
          >
            Export CSV
          </button>
          <button
            onClick={() => handelRemoveAll()}
            className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700"
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
