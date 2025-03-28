import { HTMLAttributes } from 'react';

type TColunmName = {
  field: string;
  title?: string;
};

export type TTableProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  columnNames: TColunmName[];
  data: Record<string, number | string>[];
  isCardView?: boolean;
  uniqueField: string;
};
