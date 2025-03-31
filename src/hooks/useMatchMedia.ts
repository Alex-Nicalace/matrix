import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

export type IMediaQuery = string[];
export type IMatchedMedia = boolean[];

/**
 *
 * @param queries массив с медиа запросами !!НУЖНО МЕМОРИЗИРОВАТЬ В МЕСТЕ ВЫЗОВА!!
 * @returns масив логических значений
 */
export default function useMatchMedia(queries: IMediaQuery): IMatchedMedia {
  const mediaQueryLists = useMemo(
    () => queries.map((q) => window.matchMedia(q)),
    [queries]
  );

  /**
   * Получает текущее состояние медиа запросов
   */
  const getValue = useCallback(
    function getValue(): IMatchedMedia {
      return mediaQueryLists.map((mql) => mql.matches);
    },
    [mediaQueryLists]
  );

  const [value, setValue] = useState(getValue);

  useLayoutEffect(() => {
    function handleOnChange(): void {
      setValue(getValue);
    }
    mediaQueryLists.forEach((mql) =>
      mql.addEventListener('change', handleOnChange)
    );

    return function (): void {
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener('change', handleOnChange)
      );
    };
  }, [getValue, mediaQueryLists]);

  return value;
}
