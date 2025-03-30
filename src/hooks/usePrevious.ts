import { useEffect, useRef } from 'react';

/**
 * Пользовательский React хук, который возвращает предыдущее значение входного параметра.
 *
 * @param value - Текущее отслеживаемое значение
 * @return  Предыдущее значение
 */
export function usePrevious<T>(value: T): T | null {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
