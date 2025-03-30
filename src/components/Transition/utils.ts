// * Алгоритмы данных функций подсмотрел 😀 здесь
// * https://github.com/reactjs/react-transition-group/blob/master/src/utils/ChildMapping.js

import { Children, cloneElement, isValidElement } from 'react';
import {
  TChildMapping,
  TNextKeysPending,
  TOnExitedFn,
  TTransitionComponent,
} from './Transition.types';

/**
 * Создает отображение детей, где ключ - это key — пропс компонента, а значение - это измененный child,
 * если mapFn не undefined, то child будет изменен этим функционалом.
 * @param children - исходные дети
 * @param mapFn - функция, изменяющая child, если undefined, то child оставляется неизменным
 * @returns отображение детей, где ключ - это key, а значение - это измененный child
 */
export function getChildMapping(
  children: TTransitionComponent[],
  mapFn?: (child: TTransitionComponent) => TTransitionComponent
) {
  const mapper = (child: TTransitionComponent) =>
    mapFn && isValidElement(child) ? mapFn(child) : child;

  const result: TChildMapping = Object.create(null);
  Children.map(children, (c) => c).forEach((child) => {
    const key = child.key;
    if (key) {
      result[key] = mapper(child);
    }
  });

  return result;
}

/**
 * Когда вы добавляете или удаляете детей, некоторые из них могут быть
 * добавлены или удалены в рамках одного прохода рендеринга. Мы хотим
 * отображать *оба* элемента, так как хотим одновременно анимировать
 * элементы новый и устаревшие. Данная функция принимает предыдущий набор ключей
 * и новый набор ключей и объединяет их с нашим лучшим предположением
 * относительно верного порядка.
 *
 * @param prev предыдущие дети, как возвращены из
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param next следующие дети, как возвращены из
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return множество ключей, которое содержит все ключи
 * из `prev` и все ключи из `next` в разумном порядке.
 */
export function mergeChildMappings(
  prevChildMapping?: TChildMapping,
  nextChildMapping?: TChildMapping
) {
  const prev = prevChildMapping || {};
  const next = nextChildMapping || {};

  function getValueForKey(key: string) {
    return key in next ? next[key] : prev[key];
  }

  // Для каждого ключа `next`, список ключей, которые нужно вставить перед
  // этим ключом в объединенном списке
  const nextKeysPending: TNextKeysPending = Object.create(null);

  let pendingKeys: string[] = [];
  for (const prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  let i;
  const childMapping: TChildMapping = {};
  for (const nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        const pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] =
          getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Наконец, добавьте ключи, которые не появились перед любым ключом в `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

/**
 * Создает отображение детей, которое содержит информацию о состоянии
 * перехода (enter/exit) на основе предыдущего состояния (prevChildMapping)
 * и следующего состояния (nextChildren).
 *
 * @param nextChildren - текущие дети.
 * @param prevChildMapping - предыдущие дети, как возвращены из `getChildMapping()`.
 * @param onExited - функция, вызываемая при удалении ребенка.
 * @returns отображение детей, которое содержит информацию о состоянии
 * перехода (enter/exit)
 */

export function getNextChildMapping(
  nextChildren: TTransitionComponent[],
  prevChildMapping: TChildMapping,
  onExited: TOnExitedFn
) {
  const nextChildMapping = getChildMapping(nextChildren);
  const children = mergeChildMappings(prevChildMapping, nextChildMapping);

  Object.keys(children).forEach((key) => {
    const child = children[key];

    if (!isValidElement(child)) return;

    const hasPrev = key in prevChildMapping;
    const hasNext = key in nextChildMapping;

    const prevChild = prevChildMapping[key];
    const isLeaving = isValidElement(prevChild) && !prevChild.props.enter;

    // элемент новый (вход)
    if (hasNext && (!hasPrev || isLeaving)) {
      // console.log('entering', key)
      children[key] = cloneElement(child, {
        onExited: () => onExited(child),
        enter: true,
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      // элемент устарел (выход)
      // console.log('leaving', key)
      children[key] = cloneElement(child, {
        enter: false,
        onExited: () => onExited(child),
      });
    } else if (hasNext && hasPrev && isValidElement(prevChild)) {
      // элемент не изменил состояния перехода
      // копируем предыдущие свойства перехода;
      // console.log('unchanged', key)
      children[key] = cloneElement(child, {
        onExited: () => onExited(child),
        enter: prevChild.props.enter,
      });
    }
  });

  return children;
}

/**
 * Создает отображение детей, которое содержит информацию о состоянии
 * перехода (enter/exit) на основе начальных детей.
 *
 * @param children - начальные дети.
 * @param onExited - функция, вызываемая при удалении ребенка.
 * @returns отображение детей, которое содержит информацию о состоянии
 * перехода (enter/exit)
 */
export function getInitialChildMapping(
  children: TTransitionComponent[],
  onExited: (child: TTransitionComponent) => void
) {
  return getChildMapping(children, (child: TTransitionComponent) => {
    return cloneElement(child, {
      onExited: () => onExited(child),
      enter: true,
    });
  });
}
