import classNames from 'classnames';
import Container from '../Container';
import { TAssetsDataProps } from './AssetsData.types';
import Table from '../UI/Table';
import './AssetsData.scss';

function AssetsData({ className, ...props }: TAssetsDataProps) {
  return (
    <Container
      tag="main"
      className={classNames('assets-data', className)}
      {...props}
    >
      <Table className="assets-data__table">
        <Table.Thead
          data={[
            'Актив',
            'Количество',
            'Цена',
            'Общая стоимость',
            'Изм. за 24 ч.',
            '% портфеля',
          ]}
        />
        <Table.Tbody
          data={[
            ['ETH', '10.00000', '1 913,58', '1 913,58', '0.00%', '0.00%'],
            ['ETH', '10.00000', '1 913,58', '1 913,58', '0.00%', '0.00%'],
          ]}
        />
      </Table>
    </Container>
  );
}

export default AssetsData;
