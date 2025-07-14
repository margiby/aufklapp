import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

const ApiPage = (): ReactElement => (
  <section className="section"> 
    <div className="container">
      <h1 className="title">
        <FormattedMessage id="apiPage_title" defaultMessage="API Dokumentation" />
      </h1>
      <div className="content">
        <p className="subtitle">
          {/* Inhalt */}
          <FormattedMessage id="apiPage_description" defaultMessage="Hier finden Sie die API-Dokumentation." />
        </p>
      </div>
    </div>
  </section>
);

export default ApiPage;