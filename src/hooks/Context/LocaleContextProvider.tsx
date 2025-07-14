import { useState, ReactNode } from "react";
import {LocaleContext} from "./LocaleContext";
import { DE, EN } from "./localeConstants";

type LocaleContextProviderProps = { children: ReactNode };

const LocaleContextProvider = ({ children }: LocaleContextProviderProps) => {
    // Funktion, um die initiale Sprache festzulegen
    const getInitialLanguage = () => {
        // Holt die Sprache aus dem Local Storage, falls vorhanden
        if (typeof window !== "undefined" && navigator.language) {
            const langBrowser = navigator.language.slice(0, 2);
            if ([DE, EN].includes(langBrowser)) {
                return langBrowser;
            }
        }
            return DE; 
        };
    

    // State für die aktuell ausgewählte Sprache
    const [activeLocale, setActiveLocale] = useState(getInitialLanguage());

    // Objekt, das die verfügbaren Sprachen und die aktive Sprache enthält
    const localesInfo = { activeLocale: activeLocale, de: DE, en: EN };

    return (
        // Stellt den localesInfo-State und die setActiveLocale-Funktion allen Kind-Komponenten zur Verfügung
        <LocaleContext.Provider value={[localesInfo, setActiveLocale]}>
            {children}
        </LocaleContext.Provider>
    );
};

export default LocaleContextProvider;