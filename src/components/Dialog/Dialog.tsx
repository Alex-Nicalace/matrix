import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
// import { useLocation, useNavigate } from 'react-router-dom';
import { Transition, TStateTransition } from '../Transition';
import { useLockDocumentScroll } from '../../hooks/useLockDocumentScroll';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import {
  ICustomCSSProperties,
  TDialogContext,
  TDialogProps,
  TOpenProps,
  TWindowBodyProps,
  TWindowProps,
} from './Dialog.types';
import './Dialog.scss';

const TRANSITION_STYLES: Record<TStateTransition, string> = {
  entering: 'dialog_opened',
  entered: 'dialog_opened',
  exiting: '',
  exited: '',
};

// контекст для попап
const DialogContext = createContext<TDialogContext>({
  openName: '',
  open: () => {},
  toggle: () => {},
  close: () => {},
});

// родительский компонент попап с контекстом
function Dialog({ children }: TDialogProps) {
  const [openName, setOpenName] = useState('');

  const close = useCallback(() => setOpenName(''), []);
  const open = useCallback((name: string) => setOpenName(name), []);
  const toggle = useCallback(
    (name: string) => setOpenName((prev) => (prev === name ? '' : name)),
    []
  );
  const value = useMemo(
    () => ({ openName, open, close, toggle }),
    [openName, open, close, toggle]
  );

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

// компонент для открытия попап
function Open({ render, windowName }: TOpenProps) {
  const { open, toggle } = useContext(DialogContext);
  const openWindow = useCallback(() => open(windowName), [open, windowName]);
  const toggleWindow = useCallback(
    () => toggle(windowName),
    [toggle, windowName]
  );
  const params = useMemo(
    () => ({ open: openWindow, toggle: toggleWindow }),
    [openWindow, toggleWindow]
  );

  return <>{render(params)}</>;
}

function Window({
  windowName,
  render,
  className,
  onClickOutside = () => {},
  fullHeight = false,
  fullWidth = false,
  transitionDuration = 600,
  transitionEffect,
  mode = 'popup',
}: TWindowProps) {
  const { close, openName, open } = useContext(DialogContext);
  // const location = useLocation();
  // const navigate = useNavigate();
  const modalNameFromHash = location.hash.slice(1);
  const isOpenFromHash = modalNameFromHash === windowName;
  const isOpen = openName === windowName;

  useEffect(
    function openModalFromHash() {
      if (isOpenFromHash) {
        open(windowName);
      }
    },
    [isOpenFromHash, open, windowName]
  );

  function closeWindow() {
    // if (isOpenFromHash) {
    //   navigate({
    //     ...location,
    //     hash: '',
    //   });
    // }
    close();
  }

  return (
    <Transition enter={isOpen} timeout={transitionDuration}>
      {(state) =>
        createPortal(
          <WindowBody
            className={[
              'dialog',
              `dialog_mode_${mode}`,
              fullHeight && 'dialog_full-height',
              fullWidth && 'dialog_full-width',
              transitionEffect
                ?.map((item) => `dialog_trans-effect_${item}`)
                .join(' '),
              TRANSITION_STYLES[state],
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            open={state !== 'exited' || isOpen}
            transitionDuration={transitionDuration}
            mode={mode}
            onClickOutside={onClickOutside}
            closeWindow={closeWindow}
          >
            {render(closeWindow)}
          </WindowBody>,
          document.body
        )
      }
    </Transition>
  );
}

/**
 * Компонент содержит непосредственно HTML попап. Можно было бы это сделать
 * непосредственно в компоненте Window, но тогда прослушиватель события клика вне
 * области попапа всегда висел на документе (useOutsideClick)
 */
function WindowBody({
  children,
  className = '',
  open = false,
  onClickOutside = () => {},
  transitionDuration,
  mode,
  closeWindow,
}: TWindowBodyProps) {
  useLockDocumentScroll();
  const contentRef = useOutsideClick<HTMLDivElement>((e) =>
    onClickOutside(closeWindow, e)
  );
  const dialogEl = useRef<HTMLDialogElement>(null);
  const style: ICustomCSSProperties = {
    ...(transitionDuration && {
      '--dialog-duration-transition': `${transitionDuration}ms`,
    }),
  };

  useEffect(
    function toggleVisibleDialog() {
      const dialog = dialogEl.current;
      if (!dialog) return;

      const showDialog = () => {
        const showDialogMethod =
          mode === 'modal' ? dialog.showModal : dialog.show;
        showDialogMethod.call(dialog); // !в отрыве от объекта ошибка
      };

      const closeDialog = () => dialog.close();

      if (open) {
        showDialog();
      } else {
        closeDialog();
      }
    },
    [open, mode]
  );

  return createPortal(
    <dialog ref={dialogEl} className={className} style={style}>
      <div ref={contentRef} className="dialog__content">
        {children}
      </div>
    </dialog>,
    document.body
  );
}

Dialog.Open = Open;
Dialog.Window = Window;

export default Dialog;
