"use client";

import { useMemo } from "react";
import type { Ebook } from "@/lib/generator";
import { useGeneratorStore } from "@/store/use-generator-store";

export const HistoryPanel = () => {
  const { history, setEbook } = useGeneratorStore();

  const content = useMemo(() => {
    if (history.length === 0) {
      return (
        <p className="text-sm text-slate-400">
          Revisit your previous digital products here. Every generation is stored for quick reuse.
        </p>
      );
    }

    return (
      <ul className="mt-4 space-y-3">
        {history.map((ebook: Ebook) => (
          <li key={ebook.id}>
            <button
              type="button"
              onClick={() => setEbook(ebook)}
              className="flex w-full flex-col rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-left transition hover:border-indigo-500/50 hover:text-indigo-200"
            >
              <span className="text-xs uppercase tracking-wide text-slate-400">{ebook.category}</span>
              <span className="font-medium text-slate-100">{ebook.title}</span>
              <span className="text-xs text-slate-400">
                Audience: {ebook.audience} · Tone: {ebook.tone}
              </span>
            </button>
          </li>
        ))}
      </ul>
    );
  }, [history, setEbook]);

  return (
    <aside className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-inner">
      <h3 className="font-display text-lg text-white">Product vault</h3>
      {content}
    </aside>
  );
};
