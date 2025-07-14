import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

const UploadPage = (): ReactElement => (
  <section className="section"> 
    <div className="container">
      <h1 className="title">
        <FormattedMessage id="uploadPage_title" defaultMessage="Datei-Upload" />
      </h1>
      <div className="content">
        <p className="subtitle">
          {/* Inhalt */}
          <FormattedMessage id="uploadPage_description" defaultMessage="Hier können Sie Ihre Dateien hochladen." />
        </p>
      </div>
    </div>
  </section>
);


export default UploadPage;
