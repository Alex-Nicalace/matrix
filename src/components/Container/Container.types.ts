import { JSX } from 'react';

export type TContainerProps<T extends keyof JSX.IntrinsicElements> = {
  tag: T;
} & JSX.IntrinsicElements[T];
