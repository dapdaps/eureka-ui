import { create } from 'zustand';
import { createJSONStorage,persist } from 'zustand/middleware';

type RecentSearchState = {
  currentSearch: string;
  recentSearches: string[];
  setSearch: (query: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
};

const MAX_RECENT_SEARCHES = 5;

export const useRecentStore = create(
  persist<RecentSearchState>(
    (set) => ({
      currentSearch: '',
      recentSearches: [],
      
      setSearch: (query) => set({ currentSearch: query }),
      
      addRecentSearch: (query) => set((state) => {
        let searches = [...state.recentSearches];
        if (searches.includes(query)) {
          searches = searches.filter(search => search !== query);
        }
        searches.unshift(query);
        if (searches.length > MAX_RECENT_SEARCHES) {
          searches.pop();
        }
        return { ...state, recentSearches: searches };
      }),

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'recent-searches-storage',
      storage: createJSONStorage(() => localStorage), 
      version: 1,
    }
  )
);
