import { ReactElement } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import DiagramOrchestrator from "./DiagramOrchestrator";
import "@xyflow/react/dist/style.css";
import "../../../../styles/diagram.css";
import "../../../../styles/versorgungskozepte.css";
import "../../../../styles/prozessketten.css";

/**
 * Die Haupt-Exportkomponente für das Interaktive Diagramm.
 * Sie stellt den `ReactFlowProvider` bereit und delegiert die
 * Initialisierung und Darstellung an den `DiagramOrchestrator`.
 */
const InteractiveDiagram = (): ReactElement => {
  return (
    <ReactFlowProvider>
      <DiagramOrchestrator />
    </ReactFlowProvider>
  );
};

export default InteractiveDiagram;