import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  large?: boolean;
  fullWidth?: boolean;
  error?: string;
  children?: React.ReactNode;
}

const Select: React.FC<Props> = props => {
  const { className, label, large, fullWidth, error, children, ...leftoverProps } = props;

  return (
    <div className={clsx({
      [styles.fullWidth]: fullWidth,
    })}>
      {label && (
        <div className={styles.label}>{label}</div>
      )}

      <select
        className={clsx(styles.select, className, {
          [styles.large]: large,
          [styles.fullWidth]: fullWidth,
          [styles.error]: error,
        })}
        {...leftoverProps as InputHTMLAttributes<HTMLSelectElement>}
      >
        {children}
      </select>

      {error && (
        <div className={styles.errorMessage}>{error}</div>
      )}
    </div>
  );
};

export default Select;
