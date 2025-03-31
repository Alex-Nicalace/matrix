import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  fetchAvailableAssets,
  selectAvailableAssetsFormattedData,
} from '../../features/availableAssets/availableAssetsSlice';
import { addAssetWithWebSocket } from '../../features/assets/assetsSlice';

import Input from '../UI/Input';
import Button from '../UI/Button';
import Table from '../UI/Table';
import Spinner from '../Spinner';

import { TAddAssetFormProps, TSelectedAsset } from './AddAssetForm.types';
import './AddAssetForm.scss';

const COLUMN_NAMES = [
  { field: 'baseAsset', title: 'Актив' },
  { field: 'lastPrice', title: 'Цена' },
  { field: 'priceChangePercent', title: 'Изм. %' },
];

function AddAssetForm({ className, closeForm, ...props }: TAddAssetFormProps) {
  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector(selectAvailableAssetsFormattedData);
  const [searchSymbol, setSearchSymbol] = useState('');
  const deferredSymbol = useDeferredValue(searchSymbol);
  const filteredAssets = useMemo(() => {
    return deferredSymbol === ''
      ? data
      : data.filter((asset) =>
          asset.baseAsset.toLowerCase().includes(deferredSymbol.toLowerCase())
        );
  }, [deferredSymbol, data]);
  const [selectedAsset, setSelectedAsset] = useState<TSelectedAsset | null>(
    null
  );
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    dispatch(fetchAvailableAssets());
  }, [dispatch]);

  function handleClickCellData(row: Record<string, string | number>) {
    setSelectedAsset({
      name: row.baseAsset.toString(),
      lastPrice: row.lastPrice.toString(),
      symbol: row.symbol.toString(),
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedAsset && quantity) {
      dispatch(
        addAssetWithWebSocket({ ...selectedAsset, quantity: +quantity })
      );

      closeForm?.();
    }
  }

  return (
    <form
      className={classNames('add-asset-form', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <Input
        className="add-asset-form__symbol"
        placeholder="Поиск символа"
        value={searchSymbol}
        onChange={(e) => setSearchSymbol(e.target.value)}
      />

      {status === 'loading' && (
        <div className="add-asset-form__symbols">
          <Spinner />
        </div>
      )}

      {status === 'succeeded' && (
        <Table
          className="add-asset-form__symbols"
          columnNames={COLUMN_NAMES}
          data={filteredAssets}
          uniqueField="symbol"
          onClickCellData={handleClickCellData}
          renderCell={(row, fieldName) => {
            if (fieldName !== 'priceChangePercent') return row[fieldName];

            const isNegative = parseFloat(row[fieldName] as string) < 0;
            return (
              <span style={{ color: isNegative ? 'red' : 'green' }}>
                {row[fieldName]}
              </span>
            );
          }}
        />
      )}

      {status === 'failed' && (
        <div className="add-asset-form__symbols">
          <p>Произошла ошибка</p>
        </div>
      )}

      {selectedAsset && (
        <div className="add-asset-form__box">
          <div className="add-asset-form__symbol-value">
            <span>{selectedAsset.name}</span>
            <span>{selectedAsset.lastPrice}</span>
          </div>
          <Input
            className="add-asset-form__quantity"
            placeholder="Количество"
            type="number"
            required
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="add-asset-form__buttons">
            <Button>добавить</Button>
            <Button onClick={closeForm} type="button">
              отмена
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

export default AddAssetForm;
