import { useEffect, useRef } from 'react';

/**
 * Функция, обрабатывающая клик за пределами указанного элемента.
 *
 * @param handler - колбэк функция, которая будет выполнена при клике за пределами элемента
 * @param ignore - флаг для указания игнорирования клика за пределами элемента
 * @param capture - флаг для указания использования фазы захвата
 * @return  ссылка на элемент
 */
export function useOutsideClick<T extends HTMLElement>(
  handler: (e: MouseEvent) => void,
  ignore = false,
  capture = true
) {
  const elenemtRef = useRef<T>(null);

  useEffect(() => {
    if (ignore) return;
    if (!elenemtRef.current) return;

    function handleClick(e: MouseEvent) {
      if (!elenemtRef.current?.contains(e.target as Node)) {
        handler(e);
      }
    }

    document.addEventListener('click', handleClick, capture);

    return () => document.removeEventListener('click', handleClick, capture);
  }, [handler, capture, ignore]);

  return elenemtRef;
}
