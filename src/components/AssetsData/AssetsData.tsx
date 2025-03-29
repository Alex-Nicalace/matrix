import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  selectAssets,
  startWebSocket,
  stopWebSocket,
} from '../../features/assets/assetsSlice';
import Button from '../UI/Button';
import Container from '../Container';
import Table from '../UI/Table';
import { TAssetsDataProps } from './AssetsData.types';
import './AssetsData.scss';

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
  const assets = useAppSelector(selectAssets);

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
      />
    </Container>
  );
}

export default AssetsData;
