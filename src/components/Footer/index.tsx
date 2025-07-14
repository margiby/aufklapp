import { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { useLocale } from "../../hooks/Context";
import packageJson from "../../../package.json";
import buildParams from "../../build_params.json";

const getBuildInfoFooter = (): string => {
  let buildInfoFooter = "";
  const version = packageJson.version;
  const buildDate = buildParams.build_date;
  const developFlag = buildParams.develop_flag;

  version && (buildInfoFooter += "v." + version + " ");
  buildInfoFooter += "(built ";
  if (buildDate) {
    buildInfoFooter += buildDate;
  } else {
    buildInfoFooter += "no build information present";
  }
  developFlag && (buildInfoFooter += ", develop branch");

  buildInfoFooter += ")";

  return buildInfoFooter;
};

const Footer = (): ReactElement => {
  const [{ activeLocale: initialLanguage }] = useLocale()!;
  const currentYear = new Date().getFullYear();
  const buildInfo = getBuildInfoFooter();

  const legalNoticeUrl: string =
    initialLanguage === "de"
      ? "https://www.dbfz.de/impressum"
      : "https://www.dbfz.de/en/legal-notice";

  const dataProtectionUrl: string =
    initialLanguage === "de"
      ? "https://www.dbfz.de/datenschutz"
      : "https://www.dbfz.de/en/data-protection";

  const contactUrl: string =
    initialLanguage === "de"
      ? "https://www.dbfz.de/kontakt"
      : "https://www.dbfz.de/en/contact";

  return (
    <footer className="footer app-footer">
      <div className="container">
        <div className="columns">
          {/* Spalte 1: Adresse */}
          <section className="column is-one-third">
            <h5 className="title is-5 footer-title">
              <FormattedMessage id="app_title" defaultMessage="BEST APP" />
            </h5>
            <address>
              <p className="has-text-weight-semibold">DBFZ</p>
              <p>
                Deutsches Biomasseforschungszentrum
                <br />
                gemeinnützige GmbH
              </p>
              <p>
                Torgauer Str. 116
                <br />D - 04347 Leipzig
              </p>
            </address>
          </section>

          {/* Spalte 2: Rechtliche Links */}
          <section className="column is-one-third">
            <h5 className="title is-5 footer-title">
              <FormattedMessage
                id="footer_legal_links"
                defaultMessage="Rechtliches"
              />
            </h5>
            <ul className="footer-links">
              <li>
                <a
                  href={legalNoticeUrl}
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FormattedMessage
                    id="footer_imprint"
                    defaultMessage="Impressum"
                  />
                </a>
              </li>
              <li>
                <a
                  href={dataProtectionUrl}
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FormattedMessage
                    id="footer_privacy"
                    defaultMessage="Datenschutz"
                  />
                </a>
              </li>
            </ul>
          </section>

          {/* Spalte 3: Kontakt */}
          <section className="column is-one-third">
            <h5 className="title is-5 footer-title">
              <FormattedMessage
                id="footer_contact_us"
                defaultMessage="Kontakt"
              />
            </h5>
            <ul className="footer-links">
              <li>
                <a
                  href={contactUrl}
                  className="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FormattedMessage
                    id="footer_contact_page"
                    defaultMessage="Kontaktseite"
                  />
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Unterer Bereich */}
        <div className="content has-text-centered footer-bottom-text">
          <p>
            &copy; {currentYear}{" "}
            <FormattedMessage id="app_title" defaultMessage="BEST APP" />
            {" | "}
            {buildInfo}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
