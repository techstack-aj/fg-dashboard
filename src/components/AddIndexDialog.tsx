// --- filepath: src/components/AddIndexDialog.tsx
import React, { useState } from "react";
import { AssetCategory } from "../types";

interface Props {
  onAdd: (name: string, category: AssetCategory, tags: string[]) => void;
}

const categories: AssetCategory[] = [
  "Tech-Aktien",
  "Altcoins",
  "Cannabis-Aktien",
  "Index",
  "Custom",
];

export default function AddIndexDialog({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<AssetCategory>("Custom");
  const [tags, setTags] = useState("");

  const canSubmit = name.trim().length > 1;

  const submit = () => {
    if (!canSubmit) return;
    onAdd(
      name.trim(),
      category,
      tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    );
    setOpen(false);
    setName("");
    setTags("");
  };

  return (
    <div>
      {open ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 max-w-xl">
          <h3 className="text-lg font-semibold mb-2">Neuen Index anlegen</h3>
          <div className="grid gap-3">
            <label className="grid gap-1">
              <span className="text-sm text-zinc-300">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="z. B. Tesla"
                className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-zinc-300">Kategorie</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AssetCategory)}
                className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-zinc-300">
                Tags (Komma-getrennt)
              </span>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Krypto, Momentum"
                className="px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
              />
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={submit}
              disabled={!canSubmit}
              className="px-3 py-1.5 rounded-lg bg-green-600 disabled:opacity-40"
            >
              Hinzufügen
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700"
            >
              Abbrechen
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700"
        >
          + Neuer Index
        </button>
      )}
    </div>
  );
}
