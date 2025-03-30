import { JSX } from 'react';

export type TDialogContext = {
  openName: string;
  open: (name: string) => void;
  toggle: (name: string) => void;
  close: () => void;
};

export type TDialogProps = {
  children: React.ReactNode;
};

export type TOpenProps = {
  render: (params: { open: () => void; toggle: () => void }) => JSX.Element;
  windowName: string;
};

export interface ICustomCSSProperties extends React.CSSProperties {
  '--dialog-duration-transition'?: string;
}

export type TTransitionEffect = 'left' | 'fade';

export type TCommonWindowProps = {
  className?: string;
  onClickOutside?: (close: () => void, e: MouseEvent) => void;
  transitionDuration?: number;
  mode?: 'modal' | 'popup';
};

export type TWindowProps = TCommonWindowProps & {
  windowName: string;
  render: (close: () => void) => JSX.Element;
  fullHeight?: boolean;
  fullWidth?: boolean;
  transitionEffect?: TTransitionEffect[];
};

export type TWindowBodyProps = TCommonWindowProps & {
  children: React.ReactNode;
  open?: boolean;
  closeWindow: () => void;
};
