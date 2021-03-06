import React from 'react';
import clsx from 'clsx';

import { Typography } from '@material-ui/core';

import styles from './CardTitle.module.scss';

interface Props {
  children: any;
  className?: string;
}

const CardTitle: React.FC<Props> = ({ children, className }) => {
  return (
    <Typography
      variant='h5'
      component='h3'
      className={clsx(styles.title, className)}
    >
      {children}
    </Typography>
  );
};

export default CardTitle;
