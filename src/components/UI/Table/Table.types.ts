import React, { HTMLAttributes } from 'react';

type TRender<T> = (item: T) => React.ReactNode;
type TTableSection = Omit<HTMLAttributes<HTMLTableSectionElement>, 'children'>;
type TRow = Omit<HTMLAttributes<HTMLTableRowElement>, 'children'>;

export type TTableProps = HTMLAttributes<HTMLTableElement>;
export type TTheadProps<T extends React.ReactNode> = TTableSection & {
  data: T[];
  render?: TRender<T>;
};
export type TTbodyProps<T extends React.ReactNode> = TTableSection & {
  data: T[][];
  render?: TRender<T>;
};

export type TRowProps<T extends React.ReactNode> = TRow & {
  data: T[];
  isHeadRow?: boolean;
  render?: TRender<T>;
};
