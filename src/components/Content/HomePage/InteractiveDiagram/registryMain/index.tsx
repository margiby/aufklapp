import { tryRegisterDiagram } from "../utils/diagramRegistry";
import { createFlexibleDiagram } from "../utils/diagramFactory";
import { mainDiagramNodes } from "./nodesMain";
import { mainDiagramEdges } from "./edgesMain";
import type { FlexibleDiagramConfig } from "../data/flow-types";

export function registerMain(): void {
  tryRegisterDiagram("root", () => {
    console.log("AKTION: Registriere Main Diagram (root)...");

    const config: FlexibleDiagramConfig = {
      nodes: mainDiagramNodes,
      edges: mainDiagramEdges,
    };

    createFlexibleDiagram("root", config, {});
  });
}