import React, { HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ref?: React.ForwardedRef<HTMLDivElement>;
  flexGrow?: boolean;
}

const Column: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, flexGrow, ...leftoverProps } = props;

  return (
    <div
      ref={ref}
      className={clsx(styles.column, className, {
        [styles.flexGrow]: flexGrow,
      })}
      {...leftoverProps}
    >
      {children}
    </div>
  );
});

export default Column;
