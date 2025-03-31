import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  removeAssetWithWebSocket,
  selectAssetsFormattedData,
  startWebSocket,
  stopWebSocket,
} from '../../features/assets/assetsSlice';
import useMatchMedia from '../../hooks/useMatchMedia';
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

const MEDIA_QUERIES = ['(max-width: 767.98px)'];

function AssetsData({ className, ...props }: TAssetsDataProps) {
  const [viewTable, setViewTable] = useState<'classic' | 'card'>('classic');
  const assets = useAppSelector(selectAssetsFormattedData);
  const dispatch = useAppDispatch();
  const [isLess768] = useMatchMedia(MEDIA_QUERIES);

  const isExistsAssets = assets.length > 0;

  useEffect(() => {
    dispatch(startWebSocket());

    return () => {
      dispatch(stopWebSocket());
    };
  }, [dispatch]);

  function handleRemoveAsset(id: string) {
    dispatch(removeAssetWithWebSocket(id));
  }

  function handleToggleView(e: React.ChangeEvent<HTMLInputElement>) {
    setViewTable(e.target.value as 'classic' | 'card');
  }

  return (
    <Container
      tag="main"
      className={classNames('assets-data', className)}
      {...props}
    >
      {isExistsAssets && isLess768 && (
        <div className="assets-data__view">
          <label>
            <input
              type="radio"
              name="view"
              value="classic"
              checked={viewTable === 'classic'}
              onChange={handleToggleView}
            />
            Классический вид
          </label>
          <label>
            <input
              type="radio"
              name="view"
              value="card"
              checked={viewTable === 'card'}
              onChange={handleToggleView}
            />
            Карточный вид
          </label>
        </div>
      )}

      {isExistsAssets ? (
        <Table
          className="assets-data__table"
          columnNames={COLUMN_NAMES}
          data={assets}
          isCardView={viewTable === 'card'}
          uniqueField="symbol"
          onClickCellData={(row) => handleRemoveAsset(String(row.symbol))}
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
      ) : (
        <div className="assets-data__empty">
          Нет активов в вашем портфеле. Добавьте что-нибудь, чтобы начать!
        </div>
      )}
    </Container>
  );
}

export default AssetsData;
