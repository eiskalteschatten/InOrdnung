import React, { HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ref?: React.ForwardedRef<HTMLDivElement>;
  flexGrow?: boolean;
  centered?: boolean;
}

const Column: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, flexGrow, centered, ...leftoverProps } = props;

  return (
    <div
      ref={ref}
      className={clsx(styles.column, className, {
        [styles.flexGrow]: flexGrow,
        [styles.centered]: centered,
      })}
      {...leftoverProps}
    >
      <div className={clsx({
        [styles.centeredContent]: centered,
      })}>
        {children}
      </div>
    </div>
  );
});

export default Column;
