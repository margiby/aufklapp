import { tryRegisterDiagram } from "../utils/diagramRegistry";
import { createFlexibleDiagram } from "../utils/diagramFactory";
import type { DiagramFactoryOptions, FlexibleDiagramConfig } from "../data/flow-types";

export function registerKomponentenSubdiagram(config: FlexibleDiagramConfig) {
  const diagramId = "komponenten";
  tryRegisterDiagram(diagramId, () => {
    const options: DiagramFactoryOptions = {
      defaultClassName: "komponenten-node",
    };
    createFlexibleDiagram(diagramId, config, options);
  });
}