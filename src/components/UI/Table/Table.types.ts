import React, { HTMLAttributes } from 'react';

type TRender<T> = (item: T) => React.ReactNode;
type TRow = Omit<HTMLAttributes<HTMLTableRowElement>, 'children'>;

export type TTableProps<T extends React.ReactNode> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  columnNames?: T[];
  renderCellHead?: TRender<T>;
  data: T[][];
  renderDataCell?: TRender<T>;
  isCardView?: boolean;
};

export type TRowProps<T extends React.ReactNode> = TRow & {
  isHeadRow?: boolean;
  data: T[];
  columnNames?: T[] | null;
  render?: TRender<T>;
};
