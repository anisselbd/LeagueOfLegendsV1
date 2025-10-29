import { create } from "zustand";
import { getLatestVersion, getChampionList } from "../api/ddragon";

export const useChampions = create((set) => ({
  version: null,
  champions: [],
  loading: false,
  error: null,

  fetchAll: async (locale = "fr_FR") => {
    try {
      set({ loading: true });
      const version = await getLatestVersion();
      const champions = await getChampionList(version, locale);
      set({ version, champions, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));