import { DetailedHTMLProps, HTMLAttributes } from 'react';
import './Spinner.scss';

type TSpinnerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  isVerticalCenter?: boolean;
};
function Spinner({ className, isVerticalCenter, ...props }: TSpinnerProps) {
  return (
    <div
      {...props}
      className={[
        'spinner',
        isVerticalCenter && 'spinner_vertical_center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    ></div>
  );
}

export default Spinner;
