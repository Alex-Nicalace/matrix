import classNames from 'classnames';
import Container from '../Container';
import { TAssetsDataProps } from './AssetsData.types';

function AssetsData({ className, ...props }: TAssetsDataProps) {
  return (
    <Container
      tag="main"
      className={classNames('assets-data', className)}
      {...props}
    >
      AssetsData
    </Container>
  );
}

export default AssetsData;
