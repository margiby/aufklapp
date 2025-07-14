import type { ReactElement } from "react";
import { ReactFlow, Controls } from "@xyflow/react";
import { FormattedMessage } from "react-intl";
import useDiagramLayout from "./diagrammHooks/useDiagramLayout";
import diagramNodeClickHandler from "./utils/diagramNodeClickHandler";
import useDiagramStore from "./diagrammHooks/useDiagramStore";
/**
 * Die Hauptansichtskomponente für das interaktive Diagramm.
 * Sie verwendet den `useDiagramLayout`-Hook für die Logik und Zustandsverwaltung
 * und kümmert sich um das Rendern des Diagramms oder eines Ladezustands.
 */
const DiagramView = (): ReactElement => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    isLoadingLayout,
    hasLayouted,
    flowContainerRef, // Ref wird vom Hook bereitgestellt und hier verwendet
    collapseNode,
  } = useDiagramLayout();
  const handleNodeClick = diagramNodeClickHandler(collapseNode);

  const { diagramId, setDiagramId } = useDiagramStore();
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="box">
      <h3 className="title is-4 has-text-centered">
        <FormattedMessage id="diagram_title" defaultMessage="Datenübersicht" />
      </h3>
      <p className="title is-5 has-text-centered">
        {diagramId === "root"
          ? "Hauptdiagramm"
          : `Subdiagramm: ${capitalize(diagramId)}`}
      </p>
      {/* Zurück-Schaltfläche */}
      {diagramId !== "root" && (
        <div className="has-text-right">
          <button
            type="button"
            aria-label="Zurück zur Übersicht"
            className="button is-light"
            onClick={() => setDiagramId("root")}
          >
            <p>
              <FormattedMessage
                id="diagram_back_button"
                defaultMessage="🔙 Zurück zur Übersicht"
              />
            </p>
          </button>
        </div>
      )}

      {/* Container für das React Flow Diagramm */}
      {/* Das ref wird hier an den Container gebunden, den der Hook für Größenmessungen benötigt. */}
      {/* Die CSS-Klasse 'is-loading' oder 'loaded' steuert die Sichtbarkeit und Übergänge. */}
      <div
        ref={flowContainerRef}
        className={`diagram-reactflow-container ${
          !hasLayouted || isLoadingLayout ? "is-loading" : "loaded"
        }`}
      >
        {/* Bedingtes Rendering: Zeige Lade-Text oder das Diagramm */}
        {!hasLayouted ? (
          <p className="loading-text">
            <FormattedMessage
              id="diagram_loading"
              defaultMessage="Layout wird berechnet..."
            />
          </p>
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodesDraggable={false} // Knoten sind nicht verschiebbar
            onNodeClick={handleNodeClick} // Handler für Klick-Events auf Knoten
            // fitView // Sorgt dafür, dass das Diagramm initial eingepasst wird (kann auch über Hook gesteuert werden)
            attributionPosition="bottom-right" // Position der React Flow Attribution
            minZoom={0.5} // Minimale Zoom-Stufe
            panOnScroll={true} // Scrollen mit der Maus ermöglicht das Verschieben des Diagramms
          >
            {/* <Background />
             Hintergrund des Diagramms (z.B. Punkte oder Linien) */}
            <Controls /> {/* Steuerelemente für Zoom und Navigation */}
            {/* <MiniMap /> Kleine Übersichtskarte des Diagramms */}
          </ReactFlow>
        )}
      </div>
    </div>
  );
};

export default DiagramView;
