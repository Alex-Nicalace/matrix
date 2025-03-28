import { createElement } from 'react';
import classNames from 'classnames';
import { TRowProps, TTableProps } from './Table.types';
import './Table.scss';

function Table<T extends React.ReactNode>({
  className,
  columnNames,
  renderCellHead,
  data,
  renderDataCell,
  isCardView,
  ...props
}: TTableProps<T>) {
  return (
    <div
      className={classNames('table', isCardView && 'table_card', className)}
      {...props}
    >
      <table className="table__table">
        {columnNames?.length && (
          <thead className="table__head">
            <Row data={columnNames} isHeadRow render={renderCellHead} />
          </thead>
        )}
        <tbody className="table__body">
          {data.map((item, index) => (
            <Row
              key={index}
              data={item}
              render={renderDataCell}
              columnNames={isCardView ? columnNames : null}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Row<T extends React.ReactNode>({
  className,
  data,
  columnNames,
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
            'data-label': columnNames?.[index],
          },
          render?.(item) ?? item
        )
      )}
    </tr>
  );
}

export default Table;
