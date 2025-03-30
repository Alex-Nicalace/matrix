import classNames from 'classnames';
import { TInputProps } from './Input.types';
import './Input.scss';

function Input({ className, ...props }: TInputProps) {
  return (
    <div className={classNames('input', className)}>
      <input className="input__input" {...props} />
    </div>
  );
}

export default Input;
