"use client";

import { useMemo } from "react";
import type { Ebook } from "@/lib/generator";
import clsx from "clsx";

type Props = {
  ebook: Ebook | null;
  loading: boolean;
  error?: string;
};

export const EbookPreview = ({ ebook, loading, error }: Props) => {
  const placeholder = useMemo(
    () => (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-slate-500">
        <div className="rounded-full border border-slate-800 bg-slate-900/80 px-4 py-1 text-xs uppercase tracking-wide">
          Ready when you are
        </div>
        <h3 className="font-display text-2xl text-slate-200">
          Forge your flagship digital product
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-slate-400">
          Configure the brief on the left and we will craft an audience-aligned e-book with
          compelling copy, chapter architecture, and bonus assets that feel hand-built.
        </p>
      </div>
    ),
    []
  );

  if (error) {
    return (
      <aside className="h-full rounded-3xl border border-rose-700/60 bg-rose-900/30 p-8 text-sm text-rose-100 shadow-xl">
        <h3 className="font-display text-xl text-rose-50">Generation interrupted</h3>
        <p className="mt-2 leading-relaxed">
          {error} If the issue persists, refresh and try again with a different configuration.
        </p>
      </aside>
    );
  }

  return (
    <aside className="h-full rounded-3xl border border-slate-800 bg-slate-950/60 p-8 shadow-xl">
      {loading ? <LoadingState /> : null}
      {!ebook ? (
        placeholder
      ) : (
        <article className={clsx("space-y-8", loading && "opacity-40 blur-[1px]")}>
          <header className="space-y-3 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-inner">
            <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs uppercase tracking-wide text-slate-300">
              {ebook.category}
            </span>
            <h2 className="font-display text-3xl text-white">{ebook.title}</h2>
            <p className="text-sm text-slate-300">{ebook.subtitle}</p>
            <div className="text-xs text-slate-400">
              Authored by <span className="text-slate-200">{ebook.author}</span> · Designed for{" "}
              <span className="text-slate-200">{ebook.audience}</span> · Tone:{" "}
              <span className="text-slate-200 capitalize">{ebook.tone}</span>
            </div>
          </header>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-sm text-slate-200 shadow-inner">
            <h3 className="font-display text-lg text-white">Launch copy</h3>
            <ul className="mt-4 space-y-3">
              {ebook.marketingCopy.map((line) => (
                <li key={line} className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4">
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-inner">
            <h3 className="font-display text-lg text-white">Table of contents</h3>
            <ol className="mt-4 space-y-2 text-sm text-slate-300">
              {ebook.tableOfContents.map((item) => (
                <li key={item} className="rounded-xl border border-slate-800/60 bg-slate-950/50 p-3">
                  {item}
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-6">
            <h3 className="font-display text-lg text-white">Chapters</h3>
            <div className="space-y-6">
              {ebook.chapters.map((chapter, index) => (
                <div
                  key={chapter.id}
                  className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-inner"
                >
                  <div className="text-xs uppercase tracking-wide text-indigo-300">
                    Chapter {index + 1}
                  </div>
                  <h4 className="font-display text-xl text-white">{chapter.title}</h4>
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-200">
                    {chapter.sections.map((section) => (
                      <div key={section.id} className="space-y-2 rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4">
                        <div className="font-semibold text-indigo-200">{section.title}</div>
                        <p className="text-slate-300 whitespace-pre-line">{section.body}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl border border-slate-800/70 bg-slate-950/80 p-4 text-sm text-slate-300">
                    <span className="font-semibold text-slate-100">Chapter Integration · </span>
                    {chapter.summary}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-inner">
            <h3 className="font-display text-lg text-white">Bonus resources</h3>
            <ul className="mt-3 flex flex-wrap gap-3 text-sm text-slate-300">
              {ebook.bonusResources.map((resource) => (
                <li
                  key={resource}
                  className="rounded-full border border-slate-800/60 bg-slate-950/60 px-4 py-2"
                >
                  {resource}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-indigo-500/40 bg-indigo-500/10 p-6 text-indigo-100 shadow-inner">
            <h3 className="font-display text-lg text-white">Call to action</h3>
            <p className="mt-2 text-sm leading-relaxed">{ebook.callToAction}</p>
          </section>
        </article>
      )}
    </aside>
  );
};

const LoadingState = () => (
  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-slate-950/80 backdrop-blur">
    <div className="flex flex-col items-center gap-3 text-slate-200">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-400 border-b-transparent" />
      <span className="text-sm uppercase tracking-[0.3em] text-slate-400">Forging</span>
    </div>
  </div>
);
