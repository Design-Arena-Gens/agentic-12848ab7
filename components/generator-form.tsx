"use client";

import { useState } from "react";
import { useGeneratorStore, buildPayload } from "@/store/use-generator-store";
import {
  CATEGORY_OPTIONS,
  AUDIENCE_OPTIONS,
  TONE_OPTIONS,
  LENGTH_OPTIONS
} from "@/lib/catalog";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import clsx from "clsx";

export const GeneratorForm = () => {
  const { setLoading, setEbook, pushHistory, setError, loading } = useGeneratorStore();
  const [form, setForm] = useState(() => buildPayload());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(undefined);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const data = await response.json();
      setEbook(data.ebook);
      pushHistory(data.ebook);
    } catch (error) {
      console.error(error);
      setError("We hit a snag creating your digital product. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    key: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl backdrop-blur"
    >
      <div className="space-y-2">
        <h2 className="font-display text-2xl text-white">Curate your product brief</h2>
        <p className="text-sm text-slate-300">
          Dial in the audience, tone, and depth. We orchestrate the assets for a ready-to-ship e-book.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Category" description="Choose the product space you want to lead.">
          <div className="grid gap-3">
            {CATEGORY_OPTIONS.map((option) => {
              const active = form.category === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  className={clsx(
                    "rounded-2xl border p-4 text-left transition hover:border-indigo-500/50 hover:text-indigo-200",
                    active
                      ? "border-indigo-500/80 bg-indigo-500/10 text-indigo-100"
                      : "border-slate-700 bg-slate-900/80"
                  )}
                  onClick={() => handleChange("category", option.value)}
                >
                  <div className="font-medium">{option.label}</div>
                  <p className="mt-1 text-sm text-slate-300">{option.description}</p>
                </button>
              );
            })}
          </div>
        </Field>

        <div className="space-y-6">
          <Field label="Audience">
            <SelectInput
              value={form.audience}
              onChange={(event) => handleChange("audience", event.target.value)}
              options={AUDIENCE_OPTIONS}
            />
          </Field>
          <Field label="Tone">
            <SelectInput
              value={form.tone}
              onChange={(event) => handleChange("tone", event.target.value)}
              options={TONE_OPTIONS}
            />
          </Field>
          <Field label="Product depth">
            <SelectInput
              value={form.length}
              onChange={(event) => handleChange("length", event.target.value)}
              options={LENGTH_OPTIONS}
            />
          </Field>
        </div>
      </div>

      <Field
        label="Signature positioning or theme"
        description="Optional. Drop a phrase or offer name to guide the narrative."
      >
        <textarea
          value={form.customTopic ?? ""}
          onChange={(event) => handleChange("customTopic", event.target.value)}
          placeholder="Build a premium Notion workspace that scales with every client engagement"
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 shadow-inner outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
          rows={3}
        />
      </Field>

      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-slate-400">
          The generator crafts chapters, section flows, bonus assets, and launch copy.
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/20 px-5 py-2 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <SparklesIcon className="h-5 w-5" />
          {loading ? "Forging product..." : "Generate Digital Product"}
        </button>
      </div>
    </motion.form>
  );
};

const Field = ({
  label,
  children,
  description
}: {
  label: string;
  children: React.ReactNode;
  description?: string;
}) => (
  <label className="block space-y-2 text-sm">
    <div className="font-medium text-slate-200">{label}</div>
    {description ? <p className="text-slate-400">{description}</p> : null}
    {children}
  </label>
);

const SelectInput = ({
  value,
  onChange,
  options
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 shadow-inner outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
