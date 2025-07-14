import { useContext } from "react";
import { LocaleContext } from "./LocaleContext";
import type { LocaleContextType } from "./LocaleContext";

// Ein Hook, um einfacher auf den LocaleContext zugreifen zu können
const useLocale = (): LocaleContextType => { 
    const context = useContext(LocaleContext);
    if (context === null) { // WICHTIG: Prüfen, ob der Context vorhanden ist
        throw new Error("Make sure your component is wrapped by LocaleContextProvider.");
    }
    return context;
};

export { useLocale };