import React, { HTMLAttributes, useEffect } from 'react';
import clsx from 'clsx';

import Button from '../Button';
import BackgroundCover from '../BackgroundCover';

import styles from './styles.module.scss';

interface InitialProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fullScreen?: boolean;
  open: boolean;
  title?: string;
}

interface PropsWithNoCloseButton extends InitialProps {
  noCloseButton: true;
  onClose?: undefined;
}

interface PropsWithCloseButton extends InitialProps {
  noCloseButton?: false | undefined;
  onClose: () => void;
}

type Props = PropsWithNoCloseButton | PropsWithCloseButton;

const Dialog: React.FC<Props> = props => {
  const { children, fullScreen, open, title, noCloseButton, onClose, className, ...leftoverProps } = props;

  useEffect(() => {
    const closeDialog = (e: KeyboardEvent) => {
      if (onClose && e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', closeDialog);

    return () => {
      window.removeEventListener('keydown', closeDialog);
    };
  }, []);

  if (!open) {
    return null;
  }

  return (
    <>
      <BackgroundCover onClick={onClose} />

      <div
        className={clsx(styles.dialog, className, {
          [styles.fullScreen]: fullScreen,
        })}
        {...leftoverProps}
      >
        {(title || !noCloseButton) && (
          <div className={styles.titleBar}>
            <div className={styles.title}>{title}</div>

            {!noCloseButton && (
              <Button
                onClick={() => onClose && onClose()}
                className={styles.closeButton}
                iconButton
              >
                <span className='material-icons'>close</span>
              </Button>
            )}
          </div>
        )}

        {children}
      </div>
    </>
  );
};

export default Dialog;
