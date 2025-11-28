import React, { useMemo, useState } from "react";
import { useIndices } from "../store/indices";
import type { IndexItem, IndexPoint } from "../types";
import { computeFGI, generateHistory, pseudoRandom, seedFromName } from "../utils/fgi";
import { useTranslation } from "react-i18next";

/** sehr einfache CSV-Parsing-Funktion mit Anführungszeichen-Support */
function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  const pushCell = () => { row.push(cell); cell = ""; };
  const pushRow = () => { rows.push(row); row = []; };

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { cell += c; }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === "," || c === ";") { pushCell(); }
      else if (c === "\n" || c === "\r") {
        // handle CRLF / LF
        if (c === "\r" && text[i + 1] === "\n") i++;
        pushCell(); pushRow();
      } else { cell += c; }
    }
  }
  // letzte Zelle/Zeile
  if (cell.length > 0 || row.length > 0) { pushCell(); pushRow(); }

  if (rows.length === 0) return [];
  const header = rows[0].map(h => h.trim().toLowerCase());
  const records: Record<string, string>[] = [];
  for (let r = 1; r < rows.length; r++) {
    if (rows[r].every(c => c.trim() === "")) continue;
    const obj: Record<string, string> = {};
    rows[r].forEach((val, i) => {
      const key = header[i] ?? `col${i}`;
      obj[key] = val.trim();
    });
    records.push(obj);
  }
  return records;
}

function toTags(raw: string | undefined): string[] {
  if (!raw) return [];
  // erlaubt Trenner: | ; , (innerhalb Quotes korrekt geparst)
  return raw
    .split(/[|;,]/)
    .map(s => s.trim())
    .filter(Boolean);
}

export default function CsvImport() {
  const { t } = useTranslation();
  const { items, setAll, addIndex } = useIndices();
  const [mode, setMode] = useState<"append" | "replace">("append");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const example = useMemo(
    () =>
      `name,category,tags,value,history\n` +
      `"Tech-Aktien","Tech-Aktien","Aktien|BigTech",,` +
      `"[{\\"date\\":\\"2025-09-10\\",\\"value\\":52},{\\"date\\":\\"2025-09-11\\",\\"value\\":56}]"`,
    []
  );

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setMsg(null);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result ?? "");
        const rows = parseCSV(text);

        const imported: IndexItem[] = rows.map((r) => {
          const name = r["name"] ?? "";
          const category = r["category"] ?? "Custom";
          const tags = toTags(r["tags"]);
          const seed = seedFromName(name);

          // value optional -> berechnen, falls leer
          const value =
            r["value"] && !Number.isNaN(Number(r["value"]))
              ? Number(r["value"])
              : computeFGI(pseudoRandom(seed));

          // history optional:
          let history: IndexPoint[] | null = null;
          const rawHist = r["history"];
          if (rawHist) {
            try {
              const parsed = JSON.parse(rawHist) as Array<{ date: string; value: number }>;
              history = parsed
                .filter(p => p && typeof p.date === "string" && typeof p.value === "number")
                .map(p => ({ date: p.date, value: p.value }));
            } catch {
              // wenn history kein valides JSON ist, ignorieren wir es und generieren selbst
              history = null;
            }
          }
          if (!history) {
            history = generateHistory(30, seed);
          }

          return {
            id: crypto.randomUUID(),
            name,
            category,
            tags,
            value,
            history,
          };
        });

        if (mode === "replace") {
          setAll(imported);
          setMsg(t("import_success", { count: imported.length, mode: t("replace_mode") }));
        } else {
          // append
          imported.forEach(it => addIndex(it.name, it.category, it.tags));
          setMsg(t("import_success", { count: imported.length, mode: t("append_mode") }));
        }
      } catch (err: any) {
        setMsg(t("import_error", { message: err?.message ?? String(err) }));
      } finally {
        setBusy(false);
        e.target.value = ""; // gleiche Datei erneut wählbar
      }
    };
    reader.onerror = () => {
      setBusy(false);
      setMsg(t("file_read_error"));
    };
    reader.readAsText(file);
  };

  return (
    <label className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700">
      {busy ? t("importing") : t("import_csv")}
      <input
        type="file"
        accept=".csv,text/csv"
        onChange={onPickFile}
        className="hidden"
        disabled={busy}
      />
      <div className="inline-flex items-center gap-2 ml-3 text-xs text-zinc-400">
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as any)}
          className="px-2 py-1 rounded-lg bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
          title={t("import_mode")}
        >
          <option value="append">{t("append")}</option>
          <option value="replace">{t("replace")}</option>
        </select>
        {msg && <span>{msg}</span>}
      </div>

      {/* Optional: kleines Tooltip / Beispiel-Format */}
      <div className="hidden">
        {example}
      </div>
    </label>
  );
}
