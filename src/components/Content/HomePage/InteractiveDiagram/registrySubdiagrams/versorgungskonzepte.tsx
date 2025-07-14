import { tryRegisterDiagram } from "../utils/diagramRegistry";
import { createFlexibleDiagram } from "../utils/diagramFactory"; 
import { Position } from "@xyflow/react";
import type { ElkLayoutOptions } from "../utils/elkLayout-utils";
import type { DiagramFactoryOptions, FlexibleDiagramConfig } from "../data/flow-types";

/**
 * Jede Subdiagramm-Art hat ihre eigene Registrierungsfunktion,
 *  weil es eigene Logik, Layout-Optionen oder Filter braucht.
 * @param config Die Konfiguration für das Versorgungskonzepte-Diagramm.
 */
export function registerVSKSubdiagram(config: FlexibleDiagramConfig): void {
  const diagramId = "versorgungskonzepte";
  tryRegisterDiagram(diagramId, () => {
    const elkOptions: ElkLayoutOptions = {
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
      "org.eclipse.elk.layered.spacing.nodeNodeBetweenLayers": "80",
      "org.eclipse.elk.spacing.nodeNode": "30",
      "org.eclipse.elk.layered.considerModelOrder.strategy": "PORTS_EAST_WEST",
      "org.eclipse.elk.layered.nodePlacement.strategy": "LINEAR_SEGMENTS",
      "org.eclipse.elk.portConstraints": "FIXED_SIDE",
    };

    const options: DiagramFactoryOptions = {
      elkOptions,
      defaultTargetPosition: Position.Left,
      defaultSourcePosition: Position.Right, 
    };

    createFlexibleDiagram(diagramId, config, options);
  });
}
