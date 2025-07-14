import { tryRegisterDiagram } from "../utils/diagramRegistry";
import { createTreeDiagram } from "../utils/diagramFactory";
import { Position } from "@xyflow/react";
import type { ElkLayoutOptions } from "../utils/elkLayout-utils";
import type {
  DiagramFactoryOptions,
  TreeFactoryNodeConfig,
} from "../data/flow-types";
import { collapseDeep } from "../utils/diagramTreeCollapse";
/**
 * Registriert das Prozessketten-Subdiagramm.
 * @param treeConfig Die hierarchische Konfiguration des Diagramms.
 */
export function registerProzesskettenSubdiagram(
  treeConfig: TreeFactoryNodeConfig
): void {
  const diagramId = "prozessketten";

  tryRegisterDiagram(diagramId, () => {
    console.log("AKTION: Registriere Prozessketten Sub-Diagramm...");

    // ELK-Layout-Optionen für eine Baumstruktur
    const elkOptions: ElkLayoutOptions = {
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
      "org.eclipse.elk.layered.spacing.nodeNodeBetweenLayers": "50",
      "org.eclipse.elk.spacing.nodeNode": "10",
      "org.eclipse.elk.layered.considerModelOrder.strategy": "PORTS_EAST_WEST",
      "org.eclipse.elk.layered.nodePlacement.strategy": 'NETWORK_SIMPLEX',
      "org.eclipse.elk.portConstraints": "FIXED_SIDE",
    };

    const options: DiagramFactoryOptions = {
      elkOptions,
      defaultTargetPosition: Position.Left,
      defaultSourcePosition: Position.Right,
      defaultClassName: "data-item-node",
    };
    // Setze initial den collapsed-Status
    collapseDeep(treeConfig);

    // Erstelle das Diagramm mit der Tree-Factory
    createTreeDiagram(diagramId, treeConfig, options);
  });
}
