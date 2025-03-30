export type TStateTransition = 'entering' | 'entered' | 'exiting' | 'exited';

export type TTransitionProps = {
  children: React.ReactNode | ((state: TStateTransition) => React.ReactNode);
  enter?: boolean;
  timeout: number;
  appear?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  onEnter?: (isAppearing?: boolean) => void;
  onEntering?: (isAppearing?: boolean) => void;
  onEntered?: (isAppearing?: boolean) => void;
  onExit?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
};

export type TTransitionGroupProps = {
  children: React.ReactElement<TTransitionProps>[];
};

export type TTransitionComponent = React.ReactElement<TTransitionProps>;
export type TChildMapping = Record<string, TTransitionComponent>;
export type TNextKeysPending = Record<string, string[]>;
export type TOnExitedFn = (child: TTransitionComponent) => void;
