import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const LANGUAGES = ["sv", "fa"];
const TRANSLATION_NS = "translation";

async function loadResources(): Promise<Record<string, Record<string, Record<string, string>>>> {
  const resources: Record<string, Record<string, Record<string, string>>> = {};
  for (const lang of LANGUAGES) {
    try {
      const res = await fetch(`/locale/${lang}/translation.json`);
      if (!res.ok) {
        console.error(`Failed to load i18n resources for ${lang}: ${res.status}`);
        console.error(`URL: /locale/${lang}/translation.json`);
        continue;
      }
      // Verify the content type
      const contentType = res.headers.get("content-type");
      if (contentType && !contentType.includes("application/json")) {
        console.warn(`Unexpected content-type for ${lang}: ${contentType}`);
      }
      const data = await res.json();
      resources[lang] = { [TRANSLATION_NS]: data };
    } catch (err) {
      console.error(`Failed to load i18n resources for ${lang}:`, err);
    }
  }
  if (Object.keys(resources).length === 0) {
    console.error("No i18n resources loaded — translations will be missing");
  } else {
    console.log(`Loaded i18n resources for: ${Object.keys(resources).join(", ")}`);
  }
  return resources;
}

export async function initI18n() {
  const resources = await loadResources();
  return i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: undefined,
      fallbackLng: ["sv"],
      ns: [TRANSLATION_NS],
      defaultNS: TRANSLATION_NS,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });
}

export default i18n;
