import { useEffect, useState } from 'react';
import { TStateTransition, TTransitionProps } from './Transition.types';
import { usePrevious } from '../../hooks/usePrevious';

function initState(appear: boolean, toggler?: boolean): TStateTransition {
  return toggler
    ? appear
      ? 'exited'
      : 'entered'
    : appear
    ? 'entered'
    : 'exited';
}

function Transition({
  enter,
  children,
  timeout,
  appear = false,
  mountOnEnter = false,
  unmountOnExit = true,
  onEnter = () => {},
  onEntering = () => {},
  onEntered = () => {},
  onExit = () => {},
  onExiting = () => {},
  onExited = () => {},
}: TTransitionProps): React.ReactNode {
  const [state, setState] = useState<TStateTransition>(() =>
    initState(appear, enter)
  );
  const prevState = usePrevious(state);

  useEffect(
    function onEnterOrExit() {
      if ((enter && state === 'entered') || (!enter && state === 'exited'))
        return;

      if (enter) {
        onEnter(appear);
        setState('entering');
      } else {
        onExit();
        setState('exiting');
      }

      const timer = setTimeout(() => {
        setState(enter ? 'entered' : 'exited');
      }, timeout);

      return () => clearTimeout(timer);
    },
    [enter, timeout, state, appear, onEnter, onExit]
  );

  useEffect(
    function onCangeState() {
      if (prevState === state) return;

      if (state === 'entering') onEntering(appear);
      if (state === 'exiting') onExiting();
      if (state === 'entered') onEntered(appear);
      if (state === 'exited') onExited();
    },
    [state, prevState, onEntering, onExiting, onEntered, onExited, appear]
  );

  const child = typeof children === 'function' ? children(state) : children;

  const isUnmount =
    (state === 'exited' && !enter && unmountOnExit) ||
    (state === 'exited' && enter && mountOnEnter);

  return isUnmount ? null : child;
}

export default Transition;
