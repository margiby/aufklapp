export type LanguageObj = {
  [key: string]: string;
};

export type LanguageData = {
  [key: string]: [string, string];
};

const lang: LanguageData = {
  // Header & Navigation
  app_title: ["BEST APP", "BEST APP"], // Der Haupttitel und Home-Link
  nav_upload: ["Upload", "Upload"],
  nav_api: ["API", "API"],

  // HomePage spezifische Texte
  homePage_welcome: ["Willkommen bei BEST APP", "Welcome to BEST APP"],
  presentation_text: [
    "Entdecken Sie hier Ihre Daten und Visualisierungen.",
    "Explore your data and visualizations here.",
  ],
  homePage_about_title: ["Über diese App", "About this App"],
  homePage_description: [
    "Kurze Übersicht der Anwendung und ihrer Funktionen.",
    "Brief overview of the application and its features.",
  ],

  uploadPage_title: ["Datei-Upload", "File Upload"],
  uploadPage_description: [
    "Hier können Sie bald Ihre Daten hochladen.",
    "Here you can soon upload your data.",
  ],
  apiPage_title: ["API Dokumentation", "API Documentation"],
  apiPage_description: [
    "Hier finden Sie bald die API-Dokumentation.",
    "Here you can find soon the API documentation.",
  ],

  // Schlüssel für Content.tsx
  content_diagram_placeholder: [
    "Hier wird das interaktive Diagramm angezeigt.",
    "The interactive diagram will be displayed here.",
  ],
  diagram_title: ["Datenübersicht", "Data Overview"],
  diagram_loading: ["Layout wird berechnet...", "Calculating layout..."],
  diagram_initializing: ["Diagramm wird initialisiert...","Diagram is initializing..."],
  diagram_back_button: ["🔙 Zurück zur Übersicht", "🔙 Back to overview"],
  diagram_fetch_error: ["Fehler beim Laden der Diagrammdaten:", "Error loading diagram data:"],

  prozessketten_diagram_title: ["Prozessketten", "Process Chains"],

  // Footer spezifische Texte
  footer_version: ["Version", "Version"],
  footer_legal_links: ["Rechtliches", "Legal"],
  footer_imprint: ["Impressum", "Imprint"],
  footer_privacy: ["Datenschutz", "Privacy Policy"],
  footer_contact_us: ["Kontakt", "Contact Us"],
  footer_contact_page: ["Kontaktseite", "Contact Page"],
};

const de: LanguageObj = {};
const en: LanguageObj = {};

Object.entries(lang).forEach(([key, val]) => {
  de[key] = val[0];
  en[key] = val[1];
});

export { de, en };
