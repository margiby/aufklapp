# Interaktives Diagramm

Dieses Verzeichnis enthält die Umsetzung des interaktiven Diagramms auf Basis von **ReactFlow**. Die nachfolgenden Abschnitte geben einen Überblick über Aufbau und Funktionsweise.

## Einstieg

Die Komponente `index.tsx` stellt den Einstiegspunkt dar. Hier wird der `ReactFlowProvider` eingebunden, der sämtliche ReactFlow-Komponenten mit Kontext versorgt. Anschließend übernimmt `DiagramOrchestrator` die Initialisierung aller Diagramme.

```tsx
import { ReactFlowProvider } from "@xyflow/react";

const InteractiveDiagram = () => (
  <ReactFlowProvider>
    <DiagramOrchestrator />
  </ReactFlowProvider>
);
```

## DiagramOrchestrator

`DiagramOrchestrator.tsx` registriert (ruft die Registrierung) beim ersten Rendern das Hauptdiagramm und alle Subdiagramme. Sobald die Registrierung abgeschlossen ist, rendert er `DiagramContainer`, welches das eigentliche Diagramm anzeigt.

```tsx
useEffect(() => {
  registerMain();     // Hauptdiagramm
  registerSubs();     // alle Subdiagramme
  setIsRegistryReady(true);
}, []);
```

Während der Registrierung wird ein Ladehinweis angezeigt.

## DiagramContainer und Hooks

`DiagramContainer.tsx` nutzt den Hook `useDiagramLayout`, um Knoten, Kanten und deren Positionen zu verwalten. Dieser Hook kümmert sich um folgende Aufgaben:

- Laden des aktuellen Diagramms aus der Registry
- Berechnen der Layout-Positionen mit **ELK.js** (`getLayoutedElements`)
- Beobachten von Größenänderungen des Containers (ResizeObserver)
- Bereitstellen der ReactFlow-Handler `onNodesChange` und `onEdgesChange`

Der so gelieferte Zustand wird an die `ReactFlow`-Komponente übergeben. Zusätzlich kümmert sich der Hook `useDiagramStore` (zustand) darum, welche Diagramm-ID aktuell angezeigt wird. Über die `handleNodeClick`-Funktion kann in ein Subdiagramm gewechselt werden.

## Registry und Factories

Unter `utils/` befinden sich Hilfsfunktionen, um Diagramme in einer zentralen Registry abzulegen. Das ermöglicht es, Diagramme nur einmal zu erstellen und später über ihre ID abzurufen.

- **diagramRegistry.tsx** – speichert alle Diagramme und stellt die Funktionen `createDiagram` sowie `tryRegisterDiagram` (Schutzmechanismus von doppelte Registrierung) bereit.
- **diagramFactory.tsx** – generiert Knoten und Kanten anhand von Konfigurationen (`FlexibleDiagramConfig` oder `TreeFactoryNodeConfig`).
- **ElkLayout-utils.tsx** – berechnet mit ELK.js die Positionen der Knoten.

## Daten und Layout

Im Ordner `data/` liegen Typdefinitionen sowie grundlegende Layoutkonstanten (z. B. Standardknotengrößen). Das Hauptdiagramm und die Subdiagramme definieren ihre Knoten und Kanten jeweils in eigenen Dateien unter `MainDiagram/` beziehungsweise `Subdiagrams/` und registrieren sich über die Factory-Funktionen.

## Ablauf beim Laden

1. `InteractiveDiagram` rendert den `DiagramOrchestrator`.
2. Dieser registriert über `registerMain` und `registerAllSubdiagrams` die Diagramme in der Registry.
3. Danach rendert `DiagramContainer`, welches mithilfe von `useDiagramLayout` das passende Diagramm aus der Registry lädt und das Layout mit ELK.js berechnet.
4. Die fertigen Knoten und Kanten werden an `ReactFlow` übergeben. Über `handleNodeClick` ist der Wechsel in ein Subdiagramm möglich.

Diese Struktur trennt Logik (Hooks und Utilities) von Daten (Diagrammdefinitionen) und Darstellung (ReactFlow-Komponente und CSS). Dadurch lässt sich das Diagramm leicht erweitern, ohne die Kernlogik anzupassen.

## Dateistruktur im Detail

```bash
InteractiveDiagram/
├─ index.tsx               # Einstieg, setzt ReactFlowProvider
├─ DiagramOrchestrator.tsx # Registriert Diagramme und zeigt DiagramContainer
├─ DiagramContainer.tsx    # Hauptansicht mit ReactFlow
├─ diagrammHooks/          # Reusable Hooks (Layout, Store, Events)
├─ utils/                  # Registry und Factory Hilfen
├─ data/                   # Typen und Layout-Konstanten
├─ MainDiagram/            # Definition des Hauptdiagramms
└─ Subdiagrams/            # Einzelne Subdiagramme
```

### diagrammHooks

- **useDiagramLayout.tsx** berechnet Positionen und verwaltet den ReactFlow State.
- **useDiagramStore.tsx** hält die aktuelle Diagramm-ID mittels `zustand`.
- **diagramEventHandler.tsx** implementiert `handleNodeClick`, um beim Klick auf einen Knoten in das passende Subdiagramm zu wechseln.

### utils

- **diagramRegistry.tsx** speichert alle Diagramme nach ihrer ID in einem Objekt.
- **diagramFactory.tsx** erstellt Diagramme aus Konfigurationen. Zwei Varianten sind verfügbar: `createFlexibleDiagram` und `createTreeDiagram`.
- **ElkLayout-utils.tsx** kapselt die Kommunikation mit **ELK.js** und liefert die berechneten Layout-Positionen zurück.

### Datenverzeichnis

- **flow-types.tsx** definiert Typs für `DiagramNode`, `DiagramEdge` und verschiedene Konfigurationsoptionen.
- **diagram-constants.tsx** enthält Standardabmessungen und Basis-ELK-Optionen.

## Beispiel: Hauptdiagramm

Der Ordner `MainDiagram/` beschreibt das zentrale Diagramm. In `nodesMain.tsx` und `edgesMain.tsx` befinden sich die einzelnen Knoten und Kanten. Daraus wird im `registerMain()`-Aufruf ein `FlexibleDiagramConfig` erstellt und an die Factory übergeben:

```tsx
// src/components/Content/InteractiveDiagram/MainDiagram/index.tsx
export function registerMain(): void {
  tryRegisterDiagram("root", () => {
    const config: FlexibleDiagramConfig = {
      nodes: mainDiagramNodes,
      edges: mainDiagramEdges,
    };
    createFlexibleDiagram("root", config, {});
  });
}
```

## Eigenes Subdiagramm hinzufügen

1. Neues File unter `Subdiagrams/` anlegen und dort `tryRegisterDiagram` und `createFlexibleDiagram` verwenden.
2. Die Registrierung in `Subdiagrams/index.tsx` ergänzen.
3. Einen Knoten im Hauptdiagramm mit der gleichen ID versehen, damit `handleNodeClick` das Subdiagramm finden kann.

### Beispiel für ein Subdiagramm

```tsx
// src/components/Content/InteractiveDiagram/Subdiagrams/mySubdiagram.tsx
import { tryRegisterDiagram } from "../utils/diagramRegistry";
import { createFlexibleDiagram } from "../utils/diagramFactory";

export function registerMySubdiagram() {
  tryRegisterDiagram("mySubdiagram", () => {
    const config = {
      nodes: [
        { id: "n1", data: { label: "Node 1" } },
        { id: "n2", data: { label: "Node 2" } },
      ],
      edges: [
        { source: "n1", target: "n2" },
      ],
    };
    createFlexibleDiagram("mySubdiagram", config, {});
  });
}
```

---

## Erweiterbarkeit

- Neue Knotentypen können einfach durch Hinzufügen einer neuen CSS-Klasse und Ergänzen in `nodeDimensionMap` in [`data/diagram-constants.tsx`](data/diagram-constants.tsx) eingeführt werden.
- Die Layout-Engine (ELK.js) kann über die Optionen in der Diagramm-Factory (`elkOptions`) angepasst werden.
- Die Architektur erlaubt beliebig viele Subdiagramme, die dynamisch gewechselt werden können.

---

## Troubleshooting

- **Diagramm wird nicht angezeigt:** Prüfe, ob das Diagramm korrekt in der Registry registriert wurde und die IDs stimmen.
- **Layout sieht falsch aus:** Überprüfe die Knotendimensionen und die ELK-Optionen.
- **Klick auf Knoten funktioniert nicht:** Stelle sicher, dass die ID des Knotens mit der Subdiagramm-ID übereinstimmt und das Subdiagramm registriert ist.

---

## Weiterführende Links

- [React Flow Dokumentation](https://reactflow.dev/)
- [ELK.js Layout-Engine](https://eclipse.dev/elk/)
