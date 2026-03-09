import { create } from "zustand";


interface AppStore {
  isNavOpen: boolean;
  setIsNavOpen: (value: boolean) => void;
  preloaderComplete: boolean;
  setPreloaderComplete: (value: boolean) => void;
}

export const useAppStore  = create<AppStore>((set) => ({
  isNavOpen: false,
  setIsNavOpen: (value: boolean) => set({ isNavOpen: value }),
  preloaderComplete: false,
  setPreloaderComplete: (value: boolean) => set({ preloaderComplete: value }),
}));
