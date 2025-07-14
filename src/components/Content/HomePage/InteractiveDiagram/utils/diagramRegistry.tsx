import type {
  DiagramNode,
  DiagramEdge,
  TreeFactoryNodeConfig,
  DiagramFactoryOptions,
} from "../data/flow-types";
import type { ElkLayoutOptions } from "./elkLayout-utils";

/**
 * Ein globales Objekt, das alle erstellten Diagramme speichert.
 * Der Schlüssel ist die Diagramm-ID.
 */
export const diagramRegistry: Record<
  string,
  {
    nodes: DiagramNode[];
    edges: DiagramEdge[];
    elkOptions?: ElkLayoutOptions;
    treeConfig?: TreeFactoryNodeConfig;
    factoryOptions?: DiagramFactoryOptions;
  }
> = {};

/**
 * Die Kernfunktion zum Erstellen/Hinzufügen eines Diagramms zur Registry.
 * Enthält grundlegende Validierungen.
 */
export function createDiagram(
  id: string,
  nodes: DiagramNode[],
  edges: DiagramEdge[],
  elkOptions?: ElkLayoutOptions
): void {
  if (!id || typeof id !== "string") {
    console.error("[createDiagram]: Ungültige Diagramm-ID:", id);
    return;
  }

  if (!Array.isArray(nodes) || !Array.isArray(edges)) {
    console.error(
      "[createDiagram]: Ungültige Knoten- oder Kantendaten für:",
      id
    );
    return;
  }

  // Diese Prüfung ist letzte Sicherheitsinstanz, falls tryRegisterDiagram umgangen wird.
  if (diagramRegistry[id]) {
    console.warn(
      `[createDiagram]: Interner Aufruf zum Überschreiben von "${id}" abgefangen.`
    );
    return;
  }

  diagramRegistry[id] = { nodes, edges, elkOptions };
  // console.info(`[createDiagram]: Diagramm "${id}" erfolgreich registriert.`);
}

/**
 * Wrapper-Funktion, um ein Diagramm nur zu registrieren, wenn es noch nicht existiert.
 * Dies verhindert die wiederholte Ausführung von aufwendigen Factory-Funktionen.
 * Sie prüft: Gibt es schon ein Diagramm mit dieser ID?
 * Wenn nein → registrationFunction() wird ausgeführt → das Diagramm wird erstellt.
 * Wenn ja → es passiert nichts (außer ein console.log("SKIPPED: ..."))
 * @param diagramId Die ID des zu registrierenden Diagramms.
 * @param registrationFunction Eine Funktion, die die eigentliche Registrierungslogik ausführt.
 */
export function tryRegisterDiagram(
  diagramId: string,
  registrationFunction: () => void
): void {
  // console.log(`VERSUCHE REGISTRIERUNG für: ${diagramId}...`);
  if (!diagramRegistry[diagramId]) {
    registrationFunction();
  } else {
    console.log(`SKIPPED: Diagramm "${diagramId}" ist bereits registriert.`);
  }
}
