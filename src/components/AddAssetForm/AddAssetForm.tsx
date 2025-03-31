import { useEffect } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  fetchAvailableAssets,
  selectAvailableAssetsFormattedData,
} from '../../features/availableAssets/availableAssetsSlice';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Table from '../UI/Table';
import Spinner from '../Spinner';
import { TAddAssetFormProps } from './AddAssetForm.types';
import './AddAssetForm.scss';

const COLUMN_NAMES = [
  { field: 'baseAsset', title: 'Актив' },
  { field: 'lastPrice', title: 'Цена' },
  { field: 'priceChangePercent', title: 'Изм. %' },
];

function AddAssetForm({ className, closeForm, ...props }: TAddAssetFormProps) {
  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector(selectAvailableAssetsFormattedData);

  useEffect(() => {
    dispatch(fetchAvailableAssets());
  }, [dispatch]);

  return (
    <form className={classNames('add-asset-form', className)} {...props}>
      <Input className="add-asset-form__symbol" placeholder="Поиск символа" />

      {status === 'loading' && <Spinner className="add-asset-form__symbols" />}

      {status === 'succeeded' && data.length > 0 && (
        <Table
          className="add-asset-form__symbols"
          columnNames={COLUMN_NAMES}
          data={data}
          uniqueField="symbol"
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

      <div className="add-asset-form__box">
        <div className="add-asset-form__symbol-value">qweerty</div>
        <Input
          className="add-asset-form__quantity"
          placeholder="Количество"
          type="number"
        />
        <div className="add-asset-form__buttons">
          <Button>добавить</Button>
          <Button onClick={closeForm} type="button">
            отмена
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddAssetForm;
