import type { Node, Edge, Position, EdgeMarker } from "@xyflow/react";
import type { ElkLayoutOptions } from "../utils/elkLayout-utils";

export type NodeDimensions = {
  width: number;
  height: number;
};

// Daten, die jeder Knoten enthalten kann
export type NodeData = {
  label: string; // Beschriftung des Knotens
  description?: string;
  icon?: string;
  [key: string]: unknown; // Ermöglicht die Aufnahme beliebiger zusätzlicher Daten.
};

export type DiagramNode = Node<NodeData>; // Spezifischer Knotentyp
export type DiagramEdge = Edge<Record<string, unknown>>; // Allgemeiner Datentyp für Kanten

// ====================================================================
// Gemeinsamer Basistyp für alle Knotenkonfigurationen
// ====================================================================
export type BaseNodeConfig = {
  className?: string;
  type?: string;
  data: NodeData;
};

// ====================================================================
// Konfigurationen für die Diagramm-Factories
// ====================================================================

export type DiagramFactoryOptions = {
  defaultClassName?: string;
  nodeIdPrefix?: string;
  defaultNodeType?: string;
  elkOptions?: ElkLayoutOptions;
  defaultTargetPosition?: Position;
  defaultSourcePosition?: Position;
};

// --------------------------------------------------------------------
// Spezifische Konfigurationen für `createTreeDiagram`
// --------------------------------------------------------------------

export type TreeFactoryNodeConfig = BaseNodeConfig & {
  id?: string; // id ist optional, da sie generiert werden kann
  collapsed?: boolean; // Wenn true, werden Kinder zunächst nicht gerendert
  children?: TreeFactoryNodeConfig[]; // Kinder für die rekursive Erstellung
};

// --------------------------------------------------------------------
// Spezifische Konfigurationen für `createFlexibleDiagram`
// --------------------------------------------------------------------

export type DiagramNodeConfig = BaseNodeConfig & {
  id: string; // id ist hier zwingend erforderlich
};

// Konfiguration für eine Kante in einem flexiblen Diagramm.

export type DiagramEdgeConfig = {
  source: string;
  target: string | string[]; // Unterstützt 1-zu-n-Beziehungen
  id?: string;
  style?: React.CSSProperties;
  animated?: boolean;
  markerStart?: EdgeMarker;
  markerEnd?: EdgeMarker;
  [key: string]: unknown;
};

// Die gesamte Konfiguration für ein flexibles Diagramm
export type FlexibleDiagramConfig = {
  nodes: DiagramNodeConfig[];
  edges: DiagramEdgeConfig[];
};


// ====================================================================
// Typen für den Fetch-Status
// ====================================================================
// Ein Zustand, der den Ladeprozess eines Diagramms beschreibt
 export type FetchState = {
  data: TreeFactoryNodeConfig | null;
  isLoading: boolean;
  error: Error | null;
}

