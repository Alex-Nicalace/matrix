import classNames from 'classnames';
import { TTableProps } from './Table.types';
import './Table.scss';

function Table({
  className,
  columnNames,
  data,
  isCardView,
  uniqueField,
  renderCell,
  onClickCellData,
  ...props
}: TTableProps) {
  return (
    <div
      className={classNames('table', isCardView && 'table_card', className)}
      {...props}
    >
      <table className="table__table">
        <thead className="table__head">
          <tr className="table__row table__row_head">
            {columnNames.map((item) => (
              <th key={item.field} className="table__cell table__cell_head">
                {item.title ?? item.field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">
          {data.map((row) => (
            <tr key={row[uniqueField]} className="table__row">
              {columnNames.map((col) => (
                <td
                  key={col.field}
                  className="table__cell"
                  data-label={isCardView ? col.title ?? col.field : null}
                  onClick={() => onClickCellData?.(row, col.field)}
                >
                  {renderCell ? renderCell(row, col.field) : row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
