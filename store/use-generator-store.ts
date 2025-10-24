import { create } from "zustand";
import type { Ebook, GeneratorPayload } from "@/lib/generator";

type State = {
  loading: boolean;
  ebook: Ebook | null;
  history: Ebook[];
  error?: string;
};

type Actions = {
  setLoading: (loading: boolean) => void;
  setEbook: (ebook: Ebook | null) => void;
  pushHistory: (ebook: Ebook) => void;
  setError: (error?: string) => void;
  reset: () => void;
};

export const useGeneratorStore = create<State & Actions>((set) => ({
  loading: false,
  ebook: null,
  history: [],
  error: undefined,
  setLoading: (loading) => set({ loading }),
  setEbook: (ebook) => set({ ebook }),
  pushHistory: (ebook) =>
    set((state) => ({
      history: [ebook, ...state.history].slice(0, 10)
    })),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      loading: false,
      ebook: null,
      history: [],
      error: undefined
    })
}));

export const buildPayload = (data: Partial<GeneratorPayload> = {}): GeneratorPayload => ({
  category: data.category ?? "marketing",
  audience: data.audience ?? "creators",
  tone: data.tone ?? "empowering",
  length: data.length ?? "standard",
  customTopic: data.customTopic?.trim()
});
