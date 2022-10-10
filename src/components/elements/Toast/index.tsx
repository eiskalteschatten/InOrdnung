import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

import { useAppDispatch } from '../../../store/hooks';

import styles from './styles.module.scss';
import { setGlobalError, setGlobalInfo } from '../../../store/entities/ui';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type?: 'info' | 'error';
  hideCloseButton?: boolean;
  wrapperClassName?: string;
}

const Toast: React.FC<Props> = ({ children, type = 'info', hideCloseButton, wrapperClassName, className, ...leftoverProps }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setGlobalInfo(''));
    dispatch(setGlobalError(''));
  };

  return (
    <div
      className={clsx(styles.toast, wrapperClassName, {
        [styles.error]: type === 'error',
      })}
      {...leftoverProps}
    >
      <div className={clsx(styles.message, className)}>
        {children}
      </div>

      {!hideCloseButton && (
        <div className={styles.closeButton} onClick={handleClose}>
          <span className='material-icons'>close</span>
        </div>
      )}
    </div>
  );
};

export default Toast;
