import React, { HTMLAttributes, useEffect, useRef } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const PopupBase: React.FC<Props> = ({ open, handleClose, children, className, ...leftoverProps }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: any) => {
      if (ref?.current !== event.target && !ref?.current?.contains(event.target)) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('click', onClick);
    }

    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [ref, open]);

  return (
    <div
      ref={ref}
      className={clsx(styles.popupBase, className)}
      {...leftoverProps}
    >
      {children}
    </div>
  );
};

export default PopupBase;
