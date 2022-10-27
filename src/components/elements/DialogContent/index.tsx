import React, { forwardRef } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
  ref?: React.ForwardedRef<HTMLDivElement>;
  className?: string;
}

const DialogContent: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, ...leftoverProps } = props;

  return (
    <div
      ref={ref}
      className={clsx(styles.content, className)}
      {...leftoverProps}
    >
      {children}
    </div>
  );
});

export default DialogContent;
