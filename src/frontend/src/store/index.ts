import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Area, Dir, Lang } from "../lib/types";

interface AdminAuthState {
  isLoggedIn: boolean;
  token: string | null;
}

interface AppStore {
  // Language & Direction (public site)
  currentLang: Lang;
  currentDir: Dir;
  setLang: (lang: Lang) => void;

  // Admin language (independent from public site)
  adminLang: Lang;
  setAdminLang: (lang: Lang) => void;

  // Admin Auth
  adminAuth: AdminAuthState;
  setAdminAuth: (isLoggedIn: boolean, token: string | null) => void;
  clearAdminAuth: () => void;

  // Areas cache
  areas: Area[];
  setAreas: (areas: Area[]) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      currentLang: "sv",
      currentDir: "ltr",

      setLang: (lang: Lang) => {
        const dir: Dir = lang === "fa" ? "rtl" : "ltr";
        document.documentElement.dir = dir;
        document.documentElement.lang = lang === "fa" ? "fa-IR" : "sv-SE";
        if (lang === "fa") {
          document.documentElement.classList.add("font-persian");
        } else {
          document.documentElement.classList.remove("font-persian");
        }
        set({ currentLang: lang, currentDir: dir });
      },

      adminLang: "sv",

      setAdminLang: (lang: Lang) => {
        // Only updates admin language — does NOT touch public site lang or DOM attributes
        set({ adminLang: lang });
      },

      adminAuth: {
        isLoggedIn: false,
        token: null,
      },

      setAdminAuth: (isLoggedIn: boolean, token: string | null) => {
        set({ adminAuth: { isLoggedIn, token } });
      },

      clearAdminAuth: () => {
        set({ adminAuth: { isLoggedIn: false, token: null } });
      },

      areas: [],

      setAreas: (areas: Area[]) => {
        set({ areas });
      },
    }),
    {
      name: "app-store",
      partialize: (state) => ({
        currentLang: state.currentLang,
        currentDir: state.currentDir,
        adminLang: state.adminLang,
        adminAuth: state.adminAuth,
        // Don't persist areas — always fetch fresh from backend
      }),
    },
  ),
);
