import { createElement } from 'react';
import classNames from 'classnames';
import {
  TRowProps,
  TTableProps,
  TTbodyProps,
  TTheadProps,
} from './Table.types';
import './Table.scss';

function Table({ children, className, ...props }: TTableProps) {
  return (
    <div className="table">
      <table className={classNames('table__table', className)} {...props}>
        {children}
      </table>
    </div>
  );
}

function Thead<T extends React.ReactNode>({
  className,
  data,
  render,
  ...props
}: TTheadProps<T>) {
  return (
    <thead className={classNames('table__head', className)} {...props}>
      <Row data={data} isHeadRow render={render} />
    </thead>
  );
}

function Tbody<T extends React.ReactNode>({
  className,
  data,
  render,
  ...props
}: TTbodyProps<T>) {
  return (
    <tbody className={classNames('table__body', className)} {...props}>
      {data.map((item, index) => (
        <Row key={index} data={item} render={render} />
      ))}
    </tbody>
  );
}

function Row<T extends React.ReactNode>({
  className,
  data,
  isHeadRow,
  render,
  ...props
}: TRowProps<T>) {
  const tag = isHeadRow ? 'th' : 'td';

  return (
    <tr
      className={classNames(
        'table__row',
        isHeadRow && 'table__row_head',
        className
      )}
      {...props}
    >
      {data.map((item, index) =>
        createElement(
          tag,
          {
            key: index,
            className: classNames(
              'table__cell',
              isHeadRow && 'table__cell_head'
            ),
          },
          render?.(item) ?? item
        )
      )}
    </tr>
  );
}

Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Row = Row;

export default Table;
