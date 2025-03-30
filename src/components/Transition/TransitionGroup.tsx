import { useCallback, useEffect, useState } from 'react';
import {
  TTransitionComponent,
  TTransitionGroupProps,
} from './Transition.types';
import {
  getChildMapping,
  getInitialChildMapping,
  getNextChildMapping,
} from './utils';

/**
 * Компонент TransitionGroup необходим для анимации добавления/удаления
 * детей. Он работает с множеством компонентов Transition.
 * TransitionGroup — главная задача упралять для каждого дочернего
 * компонента Transition пропсом - enter. Значение этого пропса
 * определяет состояние компонента и оно выводится при сравнении текущего
 * набора дочерних компонентов с предыдущим на основании
 * факта появления либо отсутствия компонента Transition с неким
 * значением свойства ref.
 *
 * @param props Свойства
 * @returns Компонент
 *
 * @example
 * <TransitionGroup>
 *   {items.map((item) => (
 *     <Transition key={item.id} timeout={300}>
 *       {({ state }) => <div> {item.name} </div>}
 *     </Transition>
 *   ))}
 * </TransitionGroup>
 */
function TransitionGroup({ children: childrenProp }: TTransitionGroupProps) {
  /**
   * Обработчик события onExited в компоненте Transition, удаляет ребенка из state childMapping,
   * если он не существует в childrenProp.
   *
   * @param child - компонент, который вызвал onExited
   */
  const handleExited = useCallback(
    (child: TTransitionComponent) => {
      const currentChildMapping = getChildMapping(childrenProp);

      if (!child.key || child.key in currentChildMapping) return;

      setChildMapping((prevChildMapping) => {
        const newChildMapping = { ...prevChildMapping };
        if (child.key && child.key in newChildMapping) {
          delete newChildMapping[child.key];
        }
        return newChildMapping;
      });
    },
    [childrenProp]
  );

  const [childMapping, setChildMapping] = useState(() =>
    getInitialChildMapping(childrenProp, handleExited)
  );

  useEffect(() => {
    setChildMapping((prevChildMapping) =>
      getNextChildMapping(childrenProp, prevChildMapping, handleExited)
    );
  }, [childrenProp, handleExited]);

  const children = Object.values(childMapping);

  return <>{children}</>;
}

export default TransitionGroup;
