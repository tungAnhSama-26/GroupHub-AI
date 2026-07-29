import { create } from 'zustand';

interface GlobalState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPlatform: string | null;
  setSelectedPlatform: (platform: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const useStore = create<GlobalState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedPlatform: null,
  setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
