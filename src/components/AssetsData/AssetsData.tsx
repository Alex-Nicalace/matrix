import { useState } from 'react';
import classNames from 'classnames';
import Container from '../Container';
import Table from '../UI/Table';
import { TAssetsDataProps } from './AssetsData.types';
import './AssetsData.scss';
import Button from '../UI/Button';

function AssetsData({ className, ...props }: TAssetsDataProps) {
  const [isCardView, setIsCardView] = useState(false);
  return (
    <Container
      tag="main"
      className={classNames('assets-data', className)}
      {...props}
    >
      <Button onClick={() => setIsCardView(!isCardView)}>Вид таблицы</Button>

      <Table
        className="assets-data__table"
        columnNames={[
          'Актив',
          'Количество',
          'Цена',
          'Общая стоимость',
          'Изм. за 24 ч.',
          '% портфеля',
        ]}
        data={[
          ['ETH', '10.00000', '1 913,58', '1 913,58', '0.00%', '0.00%'],
          ['ETH', '10.00000', '1 913,58', '1 913,58', '0.00%', '0.00%'],
        ]}
        isCardView={isCardView}
      />
    </Container>
  );
}

export default AssetsData;
