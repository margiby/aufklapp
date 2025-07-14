import { useEffect, useRef, useState, useCallback } from "react";
import { useNodesState, useEdgesState, useReactFlow } from "@xyflow/react";
import type { DiagramNode, DiagramEdge } from "../data/flow-types";
import {
  getLayoutedElements,
  type ElkLayoutOptions,
} from "../utils/elkLayout-utils";
import { BASE_ELK_OPTIONS } from "../data/diagram-constants";
import { diagramRegistry } from "../utils/diagramRegistry";
import useDiagramStore from "./useDiagramStore";
import { toggleNodeCollapse } from "../utils/diagramTreeCollapse";

/**
 * Custom Hook für die Verwaltung des Diagramm-Layouts
 * - Berechnet Positionen der Knoten und Kanten via ELK
 * - Reagiert auf Größenänderungen des Diagramm-Containers
 * - Stellt Zustand für React Flow bereit
 */

const useDiagramLayout = () => {
  // React Flow node/edge state
  const [nodes, setNodes, onNodesChange] = useNodesState<DiagramNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<DiagramEdge>([]);

  // Status für Ladeanzeige und Layout-Fortschritt
  const [isLoadingLayout, setIsLoadingLayout] = useState(true);
  const [hasLayouted, setHasLayouted] = useState(false);

  // Referenz auf den Diagramm-Container im DOM
  const flowContainerRef = useRef<HTMLDivElement>(null);
  const layoutTimeout = useRef<number | null>(null);

  const { fitView } = useReactFlow(); // Ansicht automatisch anpassen
  const { diagramId } = useDiagramStore(); // Aktuell ausgewähltes Diagramm

  /**
   * Hauptfunktion: Callback für Layout-Berechnung
   * Diese Funktion wird aufgerufen, wenn das Diagramm-Layout neu berechnet werden muss.
   */
  const layoutElements = useCallback(
    async (containerWidth?: number) => {
      setIsLoadingLayout(true);

      const currentDiagramData =
        diagramRegistry[diagramId] || diagramRegistry["root"];

      // Validierung: Diagramm muss gültige Knoten und Kanten enthalten

      if (
        !currentDiagramData ||
        !Array.isArray(currentDiagramData.nodes) ||
        !Array.isArray(currentDiagramData.edges)
      ) {
        console.error(
          `[useDiagramLayout] Ungültige Diagrammdaten für ID "${diagramId}"`
        );
        setNodes([]);
        setEdges([]);
        setHasLayouted(true);
        setIsLoadingLayout(false);
        return;
      }

      // ELK-Layout-Optionen bestimmen (Diagramm-spezifisch oder global)
      const resolvedElkOptions: ElkLayoutOptions = {
        ...(currentDiagramData.elkOptions ?? BASE_ELK_OPTIONS),
      };

      // Auf kleineren Screens: engere Abstände
      if (containerWidth && containerWidth < 768) {
        resolvedElkOptions["elk.spacing.nodeNode"] = "10";
        resolvedElkOptions["elk.spacing.edgeNode"] = "10";
      }

      const nodesToProcess = currentDiagramData.nodes.map((n) => ({ ...n }));
      const edgesToProcess = currentDiagramData.edges.map((e) => ({ ...e }));

      try {
        // Layout berechnen
        const { nodes: layoutedNodes, edges: layoutedEdges } =
          await getLayoutedElements(
            nodesToProcess,
            edgesToProcess,
            resolvedElkOptions
          );

        // Aktualisiere Zustand mit berechneten Positionen
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        // Zoom/Pan automatisch nach Layout
        requestAnimationFrame(() => {
          fitView({ padding: 0.05, duration: 600 });
          setHasLayouted(true);
        });
      } catch (err) {
        console.error("Fehler bei ELK Layout:", err);
        // Fallback: Ursprüngliche Nodes verwenden
        setNodes(currentDiagramData.nodes);
        setEdges(currentDiagramData.edges);
        setHasLayouted(true);
      } finally {
        setIsLoadingLayout(false);
      }
    },
    [diagramId, setNodes, setEdges, fitView]
  );

  /**
   * Hilfsfunktion: Entprellt Layout-Neuberechnung bei Größenänderung
   */
  const debounceLayout = (width: number) => {
    if (layoutTimeout.current) clearTimeout(layoutTimeout.current);
    layoutTimeout.current = window.setTimeout(() => {
      layoutElements(width);
    }, 600);
  };

  /**
   * Hilfsfunktion: Knoten einklappen/ausklappen
   * Diese Funktion wird aufgerufen, wenn ein Knoten im Diagramm geklickt wird.
   */

  const collapseNode = useCallback(
    (nodeId: string) => {
      toggleNodeCollapse(diagramId, nodeId);
      layoutElements(flowContainerRef.current?.clientWidth);
    },
    [diagramId, layoutElements]
  );

  /**
   * useEffect:
   * - Initiale Layout-Berechnung
   * - Setup für ResizeObserver → bei Container-Resize neues Layout
   */
  useEffect(() => {
    layoutElements(flowContainerRef.current?.clientWidth);

    const container = flowContainerRef.current;
    if (!container) {
      console.warn(
        "[useDiagramLayout] ContainerRef fehlt → kein ResizeObserver"
      );
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        debounceLayout(entry.contentRect.width);
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (layoutTimeout.current) clearTimeout(layoutTimeout.current);
    };
  }, [layoutElements]);

  // Exporte für das Diagramm-UI
  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    isLoadingLayout,
    hasLayouted,
    flowContainerRef,
    collapseNode,
  };
};

export default useDiagramLayout;
