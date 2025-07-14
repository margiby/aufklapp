import type { TreeFactoryNodeConfig } from "../components/Content/HomePage/InteractiveDiagram/data/flow-types";

type BioDataFields = {
  name_german: string;
  name_english: string;
  acronym_german?: string;
  acronym_english?: string;
  type?: number;
  [key: string]: unknown;
};

type BioDataItem = {
  model: string;
  pk: number;
  fields: BioDataFields;
};

/**
 * Wandelt die flachen Daten aus dump_BioData_bet.json in eine hierarchische Baumstruktur um,
 * die von createTreeDiagram verwendet werden kann.
 * @param bioData Das Array von Objekten aus der JSON-Datei.
 * @param language Die zu verwendende Sprache ('de' oder 'en').
 * @returns Eine Konfiguration für den Wurzelknoten des Baumes.
 */

// TODO: check Typescript to avoid any!
export function transformBioData(
  bioData: BioDataItem[],
  language: string
): TreeFactoryNodeConfig {
  // 1. Filtern und Mappen der relevanten Daten
  const types = bioData.filter(
    (item) => item.model === "processes.processchaintype"
  );

  const groups = bioData.filter(
    (item) => item.model === "processes.processchaingroup"
  );
  // const chains = bioData.filter(item => item.model === "processes.processchain");

  // Erstellen von Maps für schnellen Zugriff
  const groupsMap = new Map<number, TreeFactoryNodeConfig[]>();
  groups.forEach((group) => {
    const parentTypeId = group.fields.type;
    if (typeof parentTypeId !== "number") {
      console.warn(
        `Gruppe ${group.pk} hat keinen gültigen type-Wert und wird übersprungen.`
      );
      return;
    }
    if (!groupsMap.has(parentTypeId)) {
      groupsMap.set(parentTypeId, []);
    }
    groupsMap.get(parentTypeId)!.push({
      id: `group-${group.pk}`,
      data: {
        label:
          language === "de"
            ? group.fields.name_german
            : group.fields.name_english,
        acronym:
          language === "de"
            ? group.fields.acronym_german
            : group.fields.acronym_english,
      },
      // children: [],
    });
  });

  // const chainsMap = new Map<number, TreeFactoryNodeConfig[]>();
  // chains.forEach(chain => {
  //   const parentGroupId = chain.fields.group;
  //   if (!chainsMap.has(parentGroupId)) {
  //     chainsMap.set(parentGroupId, []);
  //   }
  //   chainsMap.get(parentGroupId)!.push({
  //     id: `chain-${chain.pk}`,
  //     data: { label: chain.fields.name_german },
  //   });
  // });

  // 2. Zusammenbauen des Baumes
  const typeNodes: TreeFactoryNodeConfig[] = types.map((type) => {
    const childGroups = groupsMap.get(type.pk) || [];

    // childGroups.forEach(groupNode => {
    //   const groupId = parseInt(groupNode.id!.split('-')[1]);
    //   groupNode.children = chainsMap.get(groupId) || [];
    // });

    return {
      id: `type-${type.pk}`,
      data: {
        label:
          language === "de"
            ? type.fields.name_german
            : type.fields.name_english,
      },
      children: childGroups,
      className: "data-category-node",
    };
  });

  // 3. Erstellen des finalen Wurzelknotens
  const rootNode: TreeFactoryNodeConfig = {
    id: "prozessketten-root",
    data: { label: "Prozessketten Übersicht" },
    className: "data-node",
    children: typeNodes,
  };

  console.log(rootNode);

  return rootNode;
}
