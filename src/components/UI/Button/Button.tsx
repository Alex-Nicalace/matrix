import classNames from 'classnames';
import { TButtonProps } from './Button.types';
import './Button.scss';

function Button({ className, children, ...props }: TButtonProps) {
  return (
    <button className={classNames('button', className)} {...props}>
      <span className="button__text">{children}</span>
    </button>
  );
}

export default Button;
