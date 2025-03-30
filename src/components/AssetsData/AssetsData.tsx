import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  selectAssetsFormattedData,
  startWebSocket,
  stopWebSocket,
} from '../../features/assets/assetsSlice';
import Button from '../UI/Button';
import Container from '../Container';
import Table from '../UI/Table';
import { TAssetsDataProps } from './AssetsData.types';
import './AssetsData.scss';
import Dialog from '../Dialog';

const COLUMN_NAMES = [
  { field: 'name', title: 'Актив' },
  { field: 'quantity', title: 'Количество' },
  { field: 'currentPrice', title: 'Цена' },
  { field: 'purchasePrice', title: 'Общая стоимость' },
  { field: 'change24h', title: 'Изм. за 24 ч.' },
  { field: 'percentageOfPortfolio', title: '% портфеля' },
];

function AssetsData({ className, ...props }: TAssetsDataProps) {
  const [isCardView, setIsCardView] = useState(false);
  const assets = useAppSelector(selectAssetsFormattedData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startWebSocket());

    return () => {
      dispatch(stopWebSocket());
    };
  }, [dispatch]);

  return (
    <Container
      tag="main"
      className={classNames('assets-data', className)}
      {...props}
    >
      <Button onClick={() => setIsCardView(!isCardView)}>Вид таблицы</Button>

      <Table
        className="assets-data__table"
        columnNames={COLUMN_NAMES}
        data={assets}
        isCardView={isCardView}
        uniqueField="symbol"
        renderCell={(row, fieldName) => {
          if (fieldName !== 'change24h') return row[fieldName];

          const isNegative = parseFloat(row[fieldName] as string) < 0;
          return (
            <span style={{ color: isNegative ? 'red' : 'green' }}>
              {row[fieldName]}
            </span>
          );
        }}
      />
      <Dialog.Window
        windowName="addActive"
        mode="modal"
        transitionEffect={['fade']}
        render={(close) => (
          <div>
            <h1>Register</h1>
            <button onClick={close}>Close</button>
          </div>
        )}
        onClickOutside={(close) => close()}
      />
    </Container>
  );
}

export default AssetsData;
