import { useState } from "react";
import { IndexCategory, INDEX_CATEGORIES } from "../config/categories";
import { MyButton } from "simple-ui-lib";
import { useTranslation } from "react-i18next";

interface Props {
  onAdd: (name: string, category: IndexCategory, tags: string[]) => void;
}

const categories: IndexCategory[] = INDEX_CATEGORIES;

export default function AddIndexDialog({ onAdd }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<IndexCategory>("Custom");
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
        <div className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700">
          <h3 className="text-lg font-semibold mb-2">{t("new_index")}</h3>
          <div className="grid gap-3">
            <label className="grid gap-1">
              <span className="text-sm text-zinc-300">{t("name")}</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("name_placeholder")}
                className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-zinc-300">{t("category")}</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IndexCategory)}
                className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
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
                {t("tags_label")}
              </span>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder={t("tags_placeholder")}
                className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
              />
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <MyButton label={t("add")} onClick={submit} />
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
        >
          {t("add_new_index")}
        </button>
      )}
    </div>
  );
}
