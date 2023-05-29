import { HTMLAttributes, PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import { IconButton } from './Button';

export type ModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    title: string;
    open: boolean;
    onClosed?: () => void;
  }>;

function Modal(props: ModalProps) {
  const { children, title, open, onClosed, ...otherProps } = props;

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return open
    ? createPortal(
        <div
          tabIndex={-1}
          aria-hidden={!open}
          className="flex bg-black/90 overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full h-modal md:h-full"
        >
          <div {...otherProps} className="relative p-4 w-full max-w-2xl h-full md:w-auto md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg capitalize font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>

                <IconButton
                  className="bg-transparent hover:bg-gray-200 p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600"
                  onClick={onClosed}
                >
                  <CloseIcon className="w-5 h-5" />
                  <span className="sr-only">Close modal</span>
                </IconButton>
              </div>

              {children}
            </div>
          </div>
        </div>,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById('portal')!
      )
    : null;
}

export default Modal;
