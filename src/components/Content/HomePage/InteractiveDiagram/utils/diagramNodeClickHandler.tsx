import { MouseEvent } from "react";
import type { Node } from "@xyflow/react";
import type { DiagramNode } from "../data/flow-types";
import useDiagramStore from "../diagrammHooks/useDiagramStore";
import { diagramRegistry } from "./diagramRegistry";

/**
 * Universeller Handler für Node-Klicks im Diagramm.
 * Unterstützt Collapse für alle Diagramme mit treeConfig.
 */
export default function diagramNodeClickHandler(
  toggleCollapse: (id: string) => void
) {
  return function handleNodeClick(
    event: MouseEvent,
    node: Node<DiagramNode["data"]>
  ): void {
    event.preventDefault();

    const diagramId = node.id;
    const current = useDiagramStore.getState().diagramId;
    const currentDiagram = diagramRegistry[current];

    // Collapse nur, wenn das aktuelle Diagramm eine treeConfig hat
    if (currentDiagram && currentDiagram.treeConfig) {
      toggleCollapse(diagramId);
      return;
    }

    // Wenn ein Subdiagramm existiert → wechsel zu diesem
    if (diagramRegistry[diagramId]) {
      useDiagramStore.getState().setDiagramId(diagramId);
    } else {
      console.log("Kein Diagramm für:", diagramId);
    }
  };
}