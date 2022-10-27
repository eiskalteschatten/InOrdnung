import React, { HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

type Props = HTMLAttributes<HTMLDivElement> & { ref?: React.ForwardedRef<HTMLDivElement> };

const ButtonBase: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, children, ...leftoverProps } = props;

  return (
    <div
      className={clsx(styles.buttonBase, className)}
      ref={ref}
      {...leftoverProps}
    >
      {children}
    </div>
  );
});

export default ButtonBase;
