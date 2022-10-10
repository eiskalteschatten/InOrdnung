import React, { HtmlHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props extends HtmlHTMLAttributes<HTMLOrSVGElement> {
  small?: boolean;
}

const Spinner: React.FC<Props> = ({ small, className, ...leftoverProps }) => {
  return (
    <svg
      {...leftoverProps}
      className={clsx(styles.spinner, className, {
        [styles.small]: small,
      })}
      viewBox='0 0 50 50'
    >
      <circle className={styles.path} cx='25' cy='25' r='20' fill='none' strokeWidth='5' />
    </svg>
  );
};

export default Spinner;
