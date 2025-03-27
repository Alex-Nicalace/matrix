import { createElement, JSX } from 'react';
import classNames from 'classnames';
import { TContainerProps } from './Container.types';
import './Container.scss';

function Container<T extends keyof JSX.IntrinsicElements>({
  tag,
  className,
  children,
  ...props
}: TContainerProps<T>) {
  return createElement(
    tag,
    {
      ...props,
      className: classNames('container', className),
    },
    children
  );
}

export default Container;
