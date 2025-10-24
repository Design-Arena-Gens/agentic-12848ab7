"use client";

import { Hero } from "@/components/hero";
import { GeneratorForm } from "@/components/generator-form";
import { EbookPreview } from "@/components/ebook-preview";
import { HistoryPanel } from "@/components/history-panel";
import { useGeneratorStore } from "@/store/use-generator-store";

export default function HomePage() {
  const { ebook, loading, error } = useGeneratorStore((state) => ({
    ebook: state.ebook,
    loading: state.loading,
    error: state.error
  }));

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-6 py-10 md:px-12 md:py-16">
      <Hero />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1.25fr)]">
        <div className="space-y-6">
          <GeneratorForm />
          <HistoryPanel />
        </div>
        <EbookPreview ebook={ebook} loading={loading} error={error} />
      </div>
    </main>
  );
}
