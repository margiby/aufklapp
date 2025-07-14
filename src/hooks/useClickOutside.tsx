import { useEffect, RefObject } from "react";

type EventType = MouseEvent | TouchEvent;
//  Custom hook to detect clicks outside of a specified element:
//   @param ref - RefObject pointing to the element to monitor.
//   @param handler - Callback function to execute when a click outside is detected.
 
function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: EventType) => void
): void {
  useEffect(() => {
    const listener = (event: EventType) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event); 
    };
    // Using 'mousedown' event to catch the click before it potentially
    // triggers other click events (e.g., on buttons inside the menu that might also close it)
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener); // Also listen for touch events for mobile

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Re-run if ref or handler changes
}

export default useClickOutside;
