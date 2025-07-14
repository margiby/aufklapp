import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useLocale } from "./LocaleContextHooks";

function MetaLanguage() {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const [{ activeLocale }] = useLocale()!;

    // useEffect to update the URL with the selected language
    useEffect(() => {
        if (typeof window !== "undefined") { 
            let currentUrlParams: URLSearchParams = new URLSearchParams(search);
            currentUrlParams.set("lang", activeLocale);
            navigate(`${pathname}?${currentUrlParams.toString()}`, { replace: true }); 
            // replace: true vermeidet unnötige History-Einträge
        }
    }, [activeLocale, navigate, pathname, search]);

    return null;
}

export { MetaLanguage };
