import classNames from 'classnames';
import Button from '../UI/Button';
import Container from '../Container';
import Dialog from '../Dialog';
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

        <Dialog.Open
          windowName="addActive"
          render={({ open }) => (
            <Button className="header__button" onClick={open}>
              добавить
            </Button>
          )}
        />
      </div>
    </Container>
  );
}

export default Header;
