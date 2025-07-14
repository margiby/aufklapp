import { createContext, Dispatch, SetStateAction } from "react";

// Funktion zum Ändern der Sprache
export type LocaleContextType = [
    locales: { activeLocale: string; de: string; en: string },
    setLocale: Dispatch<SetStateAction<string>> 
];

// Hier wird der Standardwert auf null gesetzt, um anzuzeigen, dass der Kontext noch nicht bereit ist
export const LocaleContext = createContext<LocaleContextType | null>(null);

