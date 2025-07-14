export type NavElement = "item" | "burger" | "menu";
type NavClassGetter = (element: NavElement, isActive: boolean) => string;
type ClassCallback = ({ isActive }: { isActive: boolean }) => string;

//Hilfsfunktion, um dynamisch Navbar Klassen basierend auf dem Zustand zu generieren.
export const getNavClass: NavClassGetter = (element, isActive) => {
  const baseClass = `navbar-${element}`;
  return isActive ? `${baseClass} is-active` : baseClass;
};

export const getItemClass: ClassCallback = ({ isActive }) => {
  return getNavClass("item", isActive);
};
