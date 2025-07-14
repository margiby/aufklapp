import { useState, useEffect, ReactElement } from "react";
import DiagramContainer from "./DiagramContainer";
import { registerMain } from "./registryMain";
import { registerAllSubdiagrams as registerSubs } from "./registrySubdiagrams";
import { FormattedMessage } from "react-intl";
import type { FlexibleDiagramConfig } from "./data/flow-types";
import useFetch from "../../../../hooks/useFetch";
import useFetchProcessData from "../../../../hooks/useFetchProcessData";

/**
 * Diese Komponente steuert die gesamte Initialisierung der Diagramme.
 * Sie folgt einem "hybriden" Ansatz:
 * 1. Das Hauptdiagramm wird sofort und statisch registriert.
 * 2. Die Subdiagramme werden asynchron aus einer externen Quelle geladen und dann registriert.
 */

const DiagramOrchestrator = (): ReactElement => {

  // 1. Hook aufrufen, um die Daten zu laden
   const { data: subdiagramData, isLoading, error } = useFetch<Record<string, FlexibleDiagramConfig>>(
    "./testdata.json"
  );

    const { data: bioData, isLoading: isLoadingBioData, error: bioDataError } = useFetchProcessData(
    "./dump_BioData_bet.json"
  );

  const [isRegistryReady, setIsRegistryReady] = useState<boolean>(false);

  // 2. useEffect, um das Hauptdiagramm zu registrieren
  useEffect(() => {
    registerMain();
  }, []);

  // 3. useEffect, um auf die geladenen Daten zu reagieren
  useEffect(() => {
    if (subdiagramData) {
      registerSubs(subdiagramData, bioData);
      setIsRegistryReady(true);
    }
  }, [subdiagramData, bioData]); 

  // 3. Lade- und Fehlerzustände behandeln
  if ( isLoading || isLoadingBioData || !isRegistryReady) {
    return (
      <div className="box">
        <p className="loading-text">
          <FormattedMessage
            id="diagram_initializing"
            defaultMessage="Diagramm wird initialisiert..."
          />
        </p>
      </div>
    );
  }

  if (error || bioDataError) {
    const errorMessage = error?.message || bioDataError?.message || "";
  return (
    <div className="box">
      <p>
        <FormattedMessage
          id="diagram_fetch_error"
          defaultMessage="Fehler beim Laden der Diagrammdaten:"
        />{" "}
        {errorMessage}
      </p>
    </div>
  );
}

  return <DiagramContainer />;
};

export default DiagramOrchestrator;