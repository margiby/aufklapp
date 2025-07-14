import type {
  DiagramNode,
  DiagramEdge,
  TreeFactoryNodeConfig,
  FlexibleDiagramConfig,
  DiagramFactoryOptions,
  DiagramNodeConfig,
} from "../data/flow-types";
import { createDiagram, diagramRegistry } from "./diagramRegistry";

/**
 * Löst die übergebenen Optionen auf und füllt sie mit Standardwerten auf.
 */
export function resolveFactoryOptions(
  diagramId: string,
  options: DiagramFactoryOptions = {}
) {
  return {
    defaultClassName: options.defaultClassName ?? "default-node",
    defaultNodeType: options.defaultNodeType ?? "default",
    nodeIdPrefix: options.nodeIdPrefix ?? `${diagramId}-n`,
    elkOptions: options.elkOptions,
    defaultTargetPosition: options.defaultTargetPosition,
    defaultSourcePosition: options.defaultSourcePosition,
  };
}
/**
 * HILFSFUNKTION
 * Erstellt einen DiagramNode aus einer Konfiguration und den aufgelösten Optionen.
 */

function mapNodeConfig(
  nodeConfig: DiagramNodeConfig, // Benötigt eine Konfiguration mit einer ID
  options: ReturnType<typeof resolveFactoryOptions>
): DiagramNode {
  return {
    id: nodeConfig.id,
    data: nodeConfig.data,
    type: nodeConfig.type || options.defaultNodeType,
    className: nodeConfig.className || options.defaultClassName,
    position: { x: 0, y: 0 }, // Position wird später durch das Layout (ELK) gesetzt
    sourcePosition: options.defaultSourcePosition,
    targetPosition: options.defaultTargetPosition,
  };
}

// ==== FLEXIBLES DIAGRAMM ====
// Diese Funktion erstellt ein flexibles Diagramm basierend auf der übergebenen Konfiguration.

export function createFlexibleDiagram(
  diagramId: string,
  config: FlexibleDiagramConfig,
  options: DiagramFactoryOptions = {}
): void {
  const resolvedOptions = resolveFactoryOptions(diagramId, options);

  const nodes: DiagramNode[] = config.nodes.map((nodeConfig) =>
    mapNodeConfig(nodeConfig, resolvedOptions)
  );

  const edges: DiagramEdge[] = config.edges.flatMap((edgeConfig, edgeIdx) => {
    const { source, target, id, ...rest } = edgeConfig;

    const targets = Array.isArray(target) ? target : [target];

    return targets.map((targetItem, targetIdx) => ({
      id: id || `edge-${source}-${targetItem}-${edgeIdx}-${targetIdx}`,
      source: source,
      target: targetItem,
      ...rest,
    }));
  });

  createDiagram(diagramId, nodes, edges, resolvedOptions.elkOptions);
  // console.info(`[createFlexibleDiagram] Diagramm "${diagramId}" erstellt.`);
}

// === TREE-DIAGRAMM ===
// Diese Funktion erstellt ein Baumdiagramm basierend auf der übergebenen Konfiguration.
export function createTreeDiagram(
  diagramId: string,
  rootNodeConfig: TreeFactoryNodeConfig,
  options: DiagramFactoryOptions = {}
): void {
  const nodes: DiagramNode[] = [];
  const edges: DiagramEdge[] = [];
  let nodeIdCounter = 0;

  const resolvedOptions = resolveFactoryOptions(diagramId, options);
  const { nodeIdPrefix } = resolvedOptions;

  function processNodeConfig(
    config: TreeFactoryNodeConfig,
    parentNodeId?: string
  ): string {
    nodeIdCounter++;
    // Stellt sicher, dass jeder Knoten eine eindeutige ID hat
    const nodeId = config.id || `${nodeIdPrefix}-${nodeIdCounter}`;

    // Prüfe, ob der Node Kinder hat
    const hasChildren =
      Array.isArray(config.children) && config.children.length > 0;
    // Wähle Symbol je nach collapsed-Status
    let collapseSymbol = "";
    if (hasChildren) {
      collapseSymbol = config.collapsed ? " [ + ]" : " [ - ]";
    }

    const newNode = mapNodeConfig(
      {
        ...config,
        id: nodeId,
        data: {
          ...config.data,
          label: `${config.data.label}${collapseSymbol}`,
        },
      },
      resolvedOptions
    );
    nodes.push(newNode);

    // Kante zum Elternknoten erstellen
    if (parentNodeId) {
      edges.push({
        id: `edge-${parentNodeId}-${nodeId}`,
        source: parentNodeId,
        target: nodeId,
      });
    }

    // Rekursiv für alle Kinder ausführen, wenn Knoten nicht eingeklappt ist
    if (!config.collapsed && config.children && config.children.length > 0) {
      config.children.forEach((childConfig) => {
        processNodeConfig(childConfig, nodeId);
      });
    }
    return nodeId;
  }

  processNodeConfig(rootNodeConfig);
  createDiagram(diagramId, nodes, edges, resolvedOptions.elkOptions);
  if (diagramRegistry[diagramId]) {
    diagramRegistry[diagramId].treeConfig = rootNodeConfig;
    diagramRegistry[diagramId].factoryOptions = resolvedOptions;
  }
  // console.info(`[createTreeDiagram] Diagramm "${diagramId}" erstellt.`);
}
