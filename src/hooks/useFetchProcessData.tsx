import { useState, useEffect } from 'react';
import { transformBioData } from '../functions/transformBioData';
import type { TreeFactoryNodeConfig, FetchState } from '../components/Content/HomePage/InteractiveDiagram/data/flow-types';
import { useLocale } from './Context';


/**
 * Ein Custom Hook zum Laden dump_BioData_bet.json
 * Er kapselt die grundlegende Fetch-Logik.
 */
function useFetchProcessData(url: string): FetchState {
  const [data, setData] = useState<TreeFactoryNodeConfig | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [{ activeLocale: initialLanguage }] = useLocale();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(transformBioData(jsonData, initialLanguage)); // Daten setzen
      } catch (e) {
        if (e instanceof Error) {
          setError(e); // Fehler setzen
        }
      } finally {
        setIsLoading(false); // Ladevorgang beenden
      }
    };

    fetchData();
  }, [url, initialLanguage]);

  return { data, isLoading, error };
}
export default useFetchProcessData;
