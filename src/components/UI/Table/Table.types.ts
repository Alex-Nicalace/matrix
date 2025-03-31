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
  renderCell?: (
    row: Record<string, number | string>,
    fieldName: string
  ) => React.ReactNode;
  onClickCellData?: (
    row: Record<string, number | string>,
    fieldName: string
  ) => void;
};
