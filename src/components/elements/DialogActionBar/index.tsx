import React, { forwardRef } from 'react';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
  ref?: React.ForwardedRef<HTMLDivElement>;
}

const DialogActionBar: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, ...leftoverProps } = props;

  return (
    <div
      ref={ref}
      className={styles.bar}
      {...leftoverProps}
    >
      {children}
    </div>
  );
});

export default DialogActionBar;
