import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

import Button from '../Button';

import styles from './styles.module.scss';

type Props = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>;

const CollapsibleBoxAddButton: React.FC<Props> = ({ children, className, ...leftoverProps }) => {
  return (
    <div className={styles.buttonWrapper}>
      <Button
        className={clsx(styles.button, className)}
        {...leftoverProps}
      >
        {children}
      </Button>
    </div>
  );
};

export default CollapsibleBoxAddButton;
