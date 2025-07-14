import { createTreeDiagram } from "./diagramFactory";
import { diagramRegistry } from "./diagramRegistry";
import type { TreeFactoryNodeConfig } from "../data/flow-types";

/**
 * Sucht einen Knoten in der Hierarchie und toggelt dessen 'collapsed'-Status.
 */
function toggleFlag(node: TreeFactoryNodeConfig, nodeId: string): boolean {
  if (node.id === nodeId) {
    node.collapsed = !node.collapsed;
    return true;
  }
  if (node.children) {
    for (const child of node.children) {
      if (toggleFlag(child, nodeId)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Aktualisiert die Hierarchie im Registry-Eintrag und erstellt das Diagramm neu.
 */
export function toggleNodeCollapse(diagramId: string, nodeId: string): void {
  const entry = diagramRegistry[diagramId];
  if (!entry || !entry.treeConfig) return;

  const found = toggleFlag(entry.treeConfig, nodeId);
  if (!found) return;

  // Diagramm neu erzeugen
  delete diagramRegistry[diagramId];
  createTreeDiagram(
    diagramId,
    entry.treeConfig,
    entry.factoryOptions || { elkOptions: entry.elkOptions }
  );
}

/**
 * Setzt rekursiv das 'collapsed'-Flag ab einer bestimmten Tiefe.
 */
export function collapseDeep(node: TreeFactoryNodeConfig, depth = 0): void {
  if (depth >= 1) {
    node.collapsed = true;
  }
  node.children?.forEach((child) => collapseDeep(child, depth + 1));
}
