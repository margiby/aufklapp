import type { ElkLayoutOptions } from "../utils/elkLayout-utils";
import type { NodeDimensions } from "./flow-types";

/**
 * Basiskonfiguration für den ELK-Layout-Algorithmus.
 * Diese Optionen definieren das grundlegende Aussehen und die Anordnung des Diagramms.
 */

export const BASE_ELK_OPTIONS: ElkLayoutOptions = {
  "elk.algorithm": "mrtree", 
  "elk.direction": "DOWN",
  "elk.spacing.nodeNode": "60",
  "elk.spacing.edgeNode": "60",
};

// Standardabmessungen für Knoten
export const DEFAULT_NODE_WIDTH = 150;
export const DEFAULT_NODE_HEIGHT = 50;

/**
 * Map zur Zuordnung von CSS-Klassen zu festen Knotengrößen.
 * ELK benötigt diese expliziten Abmessungen für das Layout.
 */
export const nodeDimensionMap: Record<string, NodeDimensions> = {
  "default-node": { width: DEFAULT_NODE_WIDTH, height: DEFAULT_NODE_HEIGHT },
  /*Hauptdiagramm Knoten */
  "circle-node": { width: 130, height: 130 },
  "produkte-node": { width: 200, height: 80 },
  "komponenten-node": { width: 470, height: 110 },
  "mix-node": { width: 150, height: 60 },
  "prozessketten-node": { width: 280, height: 80 },
  "versorgungsaufgaben-node": { width: 470, height: 110 },
  "versorgungskonzepte-node": { width: 400, height: 80 },
  /* VSK Subdiagramme */
  "tech-logo-node": { width: 250, height: 80 },
  "tech-category-node": { width: 300, height: 60 },
  "tech-item-node": { width: 280, height: 60 },
  /* Prozessketten Subdiagramme */
  "data-node": { width: 300, height: 80 },
  "data-category-node": { width: 350, height: 60 },
  "data-item-node": { width: 500, height: 30 },
};