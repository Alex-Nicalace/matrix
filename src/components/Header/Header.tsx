import classNames from 'classnames';
import Button from '../UI/Button';
import Container from '../Container';
import { THeaderProps } from './Header.types';
import './Header.scss';

function Header({ className, ...props }: THeaderProps) {
  return (
    <Container
      tag="header"
      className={classNames('header', className)}
      {...props}
    >
      <div className="header__wrapper">
        <h1 className="header__title">Portfolio Overview</h1>
        <Button className="header__button">добавить</Button>
      </div>
    </Container>
  );
}

export default Header;
