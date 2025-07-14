import type { DiagramNodeConfig } from "../data/flow-types";

//Definition der Knoten
export const mainDiagramNodes: DiagramNodeConfig[] = [
   {
    id: "eigenschaften",
    data: { label: "Eigenschaften" },
    className: "circle-node",
  },
  {
    id: "produkte",
    data: { label: "Produkte, z.B. Scheitholz" },
    className: "produkte-node",
  },
  {
    id: "paramProdukte",
    data: { label: "Parameter" },
    className: "circle-node",
  },
  {
    id: "komponenten",
    data: {
      label:
        "Komponenten, z.B. Heißwasserspeicher für En30 Klassen von Konversionsverfahren",
    },
    className: "komponenten-node",
  },
  {
    id: "paramKomponenten",
    data: { label: "Parameter" },
    className: "circle-node",
  },
  {
    id: "mix",
    data: { label: "Mix" },
    className: "mix-node",
  },
  {
    id: "prozessketten",
    data: { label: "Prozessketten, z.B.: BGA 75k PQ1 Gülle" },
    className: "prozessketten-node",
  },
  {
    id: "paramProzessketten",
    data: { label: "Parameter" },
    className: "circle-node",
  },
  {
    id: "versorgungsaufgaben",
    data: {
      label:
        "Versorgungsaufgaben/Tasks, z.B.: Industrielle Wärmeversorgung bis zu max. 200°C",
    },
    className: "versorgungsaufgaben-node",
  },
  {
    id: "paramVersorgungsaufgaben",
    data: { label: "Parameter" },
    className: "circle-node",
  },
  {
    id: "versorgungskonzepte",
    data: {
      label: "Versorgungskonzepte/supply concepts, z.B.: EH + ST für En30",
    },
    className: "versorgungskonzepte-node",
  },
  {
    id: "paramVersorgungskonzepte",
    data: { label: "Parameter" },
    className: "circle-node",
  },
];