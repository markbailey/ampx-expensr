import { useEffect } from 'react';

type Element = HTMLElement | Window | MediaQueryList | null;

// Hook for adding event listeners to elements (inc Window).
// This will make it easier to setup event listeners without writing all the boilerplate code each time.
// @param {string} eventType - The event type to listen for.
// @param {function} callback - The function to run when the event is triggered.
// @param {Element} element - The element to listen for the event on.
function useEventListener(
  eventType: string,
  callback: EventListenerOrEventListenerObject,
  element: Document | Element = window,
) {
  useEffect(() => {
    if (element === null)
      return;
    element.addEventListener(eventType, callback);
    // eslint-disable-next-line consistent-return
    return () => element.removeEventListener(eventType, callback);
  }, [eventType, element, callback]);
}

export default useEventListener;
