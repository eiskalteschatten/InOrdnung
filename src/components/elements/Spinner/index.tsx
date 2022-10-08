import React, { HtmlHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

type Props = HtmlHTMLAttributes<HTMLOrSVGElement>;

const Spinner: React.FC<Props> = ({className, ...leftoverProps}) => {
  return (
    <svg
      {...leftoverProps}
      className={clsx(styles.spinner, className)}
      viewBox='0 0 50 50'
    >
      <circle className={styles.path} cx='25' cy='25' r='20' fill='none' strokeWidth='5' />
    </svg>
  );
};

export default Spinner;
