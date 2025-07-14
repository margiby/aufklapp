import type { DiagramEdgeConfig } from "../data/flow-types";
import { MarkerType } from '@xyflow/react';

// Definition der Kanten
export const mainDiagramEdges: DiagramEdgeConfig[] = [
  // 1. Eigenschaften → Produkte
  {
    id: "e1",
    source: "produkte", // Die ID des Quellknotens
    target: "eigenschaften", // Die ID des Zielknotens
  },
  // 2. Parameter (bei Produkte) → Produkte
  {
    id: "e2",
    source: "produkte",
    target: "paramProdukte",
  },
  // 3. Produkte --→ Mix
  {
    id: "e3",
    source: "produkte",
    target: "mix",
    style: { strokeDasharray: "5 5" }, // gestrichelte Linie
    animated: true, // Animation hinzufügen
  },
  // 4. Parameter (bei Komponenten) → Komponenten
  {
    id: "e4",
    source: "komponenten",
    target: "paramKomponenten",
  },
  // 5. Produkte ↔ Komponenten
  {
    id: "e5",
    source: "komponenten",
    target:"produkte",
    markerStart: { type: MarkerType.ArrowClosed }, // Definiert eine Pfeilspitze(oder ein anderes Symbol) am Anfang der Kante.
    markerEnd: { type: MarkerType.ArrowClosed }, //Pfeilspitze at end
    style: { strokeDasharray: "5 5" },
    animated: true,
  },
  // 6. Komponenten ↔ Versorgungskonzepte
  {
    id: "e6",
    source: "komponenten",
    target: "versorgungskonzepte",
    markerStart: { type: MarkerType.ArrowClosed },
    markerEnd: { type: MarkerType.ArrowClosed },
    animated: true,
  },
  // 7. Parameter (bei Prozessketten) → Prozessketten
  {
    id: "e7",
    source: "prozessketten",
    target: "paramProzessketten",
  },
  // 8. Prozessketten --→ Mix
  {
    id: "e8",
    source: "mix",
    target: "prozessketten",
    style: { strokeDasharray: "5 5" },
    animated: true,
  },
  // 9. Mix --→ Versorgungskonzepte
  {
    id: "e9",
    source: "versorgungskonzepte",
    target: "mix",
    style: { strokeDasharray: "5 5" },
    animated: true,
  },
  // 10. Parameter (bei Versorgungsaufgaben) ↔ Versorgungsaufgaben/Tasks
  {
    id: "e10",
    source: "versorgungsaufgaben",
    target: "paramVersorgungsaufgaben",
  },
  // 11. Versorgungsaufgaben/Tasks ↔ Versorgungskonzepte
  {
    id: "e11",
    source: "versorgungsaufgaben",
    target: "versorgungskonzepte",
    markerStart: { type: MarkerType.ArrowClosed },
    markerEnd: { type: MarkerType.ArrowClosed },
    animated: true,
  },
  // 12. Parameter (bei Versorgungskonzepte) ↔ Versorgungskonzepte 
  {
    id: "e12",
    source: "versorgungskonzepte",
    target: "paramVersorgungskonzepte",
  },
  // 13. Produkte ↔ Prozessketten
  {
    id: 'e13',
    source: 'produkte',
    target: 'prozessketten',
    markerStart: { type: MarkerType.ArrowClosed },
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeDasharray: '5 5' },
    animated: true,
  },
  // 14. Prozessketten ↔ Versorgungskonzepte
  {
    id: 'e14',
    source: 'versorgungskonzepte',
    target: 'prozessketten',
    markerStart: { type: MarkerType.ArrowClosed },
    markerEnd: { type: MarkerType.ArrowClosed },
    animated: true,
  },
  // 15. Prozessketten ↔ Komponenten
  {
    id: 'e15',
    source: 'komponenten',
    target: 'prozessketten',
    markerStart: { type: MarkerType.ArrowClosed },
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];