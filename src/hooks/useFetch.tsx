import { useState, useEffect } from 'react';

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Ein Custom Hook zum Laden von Daten.
 * Er kapselt die grundlegende Fetch-Logik.
 */
function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData); // Daten setzen
      } catch (e) {
        if (e instanceof Error) {
          setError(e); // Fehler setzen
        }
      } finally {
        setIsLoading(false); // Ladevorgang beenden
      }
    };

    fetchData();
  }, [url]); // Effekt bei URL-Änderung erneut ausführen

  return { data, isLoading, error };
}
export default useFetch;