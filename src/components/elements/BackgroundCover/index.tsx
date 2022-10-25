import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

const BackgroundCover: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...leftoverProps }) => {
  return (
    <div
      className={clsx(styles.cover, className)}
      {...leftoverProps}
    />
  );
};

export default BackgroundCover;
