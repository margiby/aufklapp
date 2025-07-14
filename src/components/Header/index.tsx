import { useState, useEffect, ReactElement, useRef, MouseEvent } from "react";
import { FormattedMessage } from "react-intl";
import LanguageDropdown from "./LanguageDropdown";
import useClickOutside from "../../hooks/useClickOutside";
import { NavLink, useLocation } from "react-router";

type ToggleEvent = MouseEvent<HTMLAnchorElement | HTMLButtonElement>;

const Header = (): ReactElement => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const location = useLocation();

  // Schließt Menü bei Navigation
  useEffect(() => {
    setIsMenuActive(false);
  }, [location]);

  // Schließt Menü bei Klick außerhalb
  useClickOutside(navbarRef, () => {
    if (isMenuActive) {
      setIsMenuActive(false);
    }
  });

  const toggleMenu = (event: ToggleEvent) => {
    event.stopPropagation();
    // Um sicher zu sein, dass der Zustand korrekt aktualisiert wird: (prev)
    setIsMenuActive((prevIsActive) => !prevIsActive);
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className="navbar is-light is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/">
            <div className="navbar-logo"></div>
            <span className="navbar-title ml-2">
              <FormattedMessage id="app_title" defaultMessage="BEST APP" />
            </span>
          </NavLink>
          {/* Burger Menu Button */}
          <button
            type="button"
            className={getNavClass("burger", isMenuActive)}
            aria-label="menu"
            aria-expanded={isMenuActive}
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
        {/* Hauptmenü */}
        <div className={getNavClass("menu", isMenuActive)}>
          <div className="navbar-start">
            <NavLink 
              to="/upload"
              /* isActive ist bei React Router bereitgestellt: 
              https://reactrouter.com/tutorials/address-book#active-link-styling  */
              className={({ isActive }) => getNavClass("item", isActive)}
              >
              <FormattedMessage id="nav_upload" defaultMessage="Upload" />
            </NavLink>
            <NavLink
              to="/api"
              className={({ isActive }) => getNavClass("item", isActive)}
              >
              <FormattedMessage id="nav_api" defaultMessage="API" />
            </NavLink>
          </div>
          {/* Sprachauswahl */}
          <div className="navbar-end">
            <LanguageDropdown />
          </div>
        </div>
      </nav>
      {/* Abstandhalter */}
      <div className="navbar-spacer"></div>
    </>
  );
};

// // ----- extra functions -----
type NavElement = "item" | "burger" | "menu";
const getNavClass = (element: NavElement, active: boolean): string => {
  const baseClass = `navbar-${element}`;
  return active ? `${baseClass} is-active` : baseClass;
};

export default Header;
