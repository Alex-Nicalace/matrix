import { useEffect } from 'react';

/**
 * Пользовательский хук для блокировки прокрутки документа при вызове.
 */
export function useLockDocumentScroll(ignore = false) {
  const docEl = document.documentElement;

  useEffect(function () {
    if (
      ignore ||
      (docEl.style.overflow.length && docEl.style.paddingRight.length)
    )
      return;

    const initialStyles = docEl.style.cssText;
    const widthScroll = window.innerWidth - docEl.clientWidth;
    docEl.style.overflow = 'hidden';
    docEl.style.paddingRight = `${widthScroll}px`;

    return () => {
      docEl.style.cssText = initialStyles;
    };
  });
}
