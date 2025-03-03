import i18next from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";

import resources from "./locales";

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "es",
        interpolation: { escapeValue: false },
        detection: {
            order: ["navigator", "localStorage", "cookie"],
            caches: ["localStorage", "cookie"],
        }
    });

export default i18next;