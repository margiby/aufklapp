import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';
import InteractiveDiagram from './InteractiveDiagram'; 

const HomePage = (): ReactElement => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-1">
          <FormattedMessage id="homePage_welcome" defaultMessage="Willkommen bei BEST APP" />
        </h1>
        <div className="content">
        <p className="subtitle">
          <FormattedMessage id="presentation_text" defaultMessage="Platzhalter Text.." />
        </p>
        <div className="mt-5">
          <InteractiveDiagram />
        </div>
        </div>
        <div className="content mt-5">
          <h2 className="title is-3">
          <FormattedMessage id="homePage_about_title" defaultMessage="Über diese App" />
          </h2>
          <div className="content">
          <p className="subtitle">
            <FormattedMessage id="homePage_description" defaultMessage="Hier ist eine Beschreibung der App." />
        </p>
        </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;