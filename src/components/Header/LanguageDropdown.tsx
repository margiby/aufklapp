import { ReactElement, MouseEvent } from 'react';
import { useLocale } from '../../hooks/Context';

const LanguageDropdown = (): ReactElement => {
  const [{ activeLocale, de, en }, setLocale] = useLocale();

  const changeLanguageHandler = (e: MouseEvent<HTMLButtonElement>, lang: string) => {
    e.preventDefault();
    setLocale(lang);
  };

  return (
    <div className="navbar-item">
      <div className="field has-addons">
        {[de, en].map((langCode) => (
          <div className="control" key={langCode}>
            <button
              className={`button is-small lang-button ${activeLocale === langCode ? 'is-active-lang' : ''}`}
              onClick={(e) => changeLanguageHandler(e, langCode)}
              disabled={activeLocale === langCode}
              type="button"
            >
              {langCode.toUpperCase()}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageDropdown;