import { ReactElement, Suspense } from "react";
import { IntlProvider } from "react-intl";
import { Outlet } from "react-router";
import { useLocale, DE, MetaLanguage } from "../../hooks/Context";
import useMessages from "../../hooks/useMessages";
import Header from "../Header";
import Footer from "../Footer";

//Die Root-Komponente ist nun zuständig für das Hauptlayout der Anwendung, 
// inklusive Internationalisierung und Sprachkontext.
const RootLayout = (): ReactElement => {
  const [{ activeLocale }] = useLocale();
  const messages = useMessages(activeLocale);

  if (!messages) {
    // **TODO:** Ladeindikator, kann durch eine schönere Komponente ersetzt werden
    return <div className="loading-indicator">Loading translations...</div>;
  }

  return (
    <IntlProvider locale={activeLocale} messages={messages} defaultLocale={DE}>
      <div className="app-wrapper">
        <Header />
        <main className="main-content-area">
          <Suspense
            fallback={<div className="loading-indicator">Loading Page...</div>}
          >
            <Outlet /> {/* Hier werden die Kind-Routen gerendert */}
          </Suspense>
        </main>
        <Footer />
        <MetaLanguage />
      </div>
    </IntlProvider>
  );
};

export default RootLayout;
