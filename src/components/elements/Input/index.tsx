import React, { InputHTMLAttributes, useState } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  large?: boolean;
  fullWidth?: boolean;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<Props> = props => {
  const { className, label, large, fullWidth, error, icon, type, onFocus, onBlur, onContextMenu, ...leftoverProps } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);

    if (onFocus) {
      onFocus(e);
    }
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);

    if (onBlur) {
      onBlur(e);
    }
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLInputElement>) => {
    window.api.send('openTextFieldContextMenu');

    if (onContextMenu) {
      onContextMenu(e);
    }
  };

  return (
    <div className={clsx(className, {
      [styles.fullWidth]: fullWidth,
    })}>
      {label && (
        <div className={styles.label}>{label}:</div>
      )}

      <div className={clsx(styles.inputIcon, {
        [styles.focused]: isFocused,
        [styles.error]: error,
      })}>
        {icon && (
          <div className={styles.icon}>{icon}</div>
        )}

        <input
          className={clsx(styles.input, {
            [styles.large]: large,
            [styles.fullWidth]: fullWidth,
          })}
          type={type || 'text'}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onContextMenu={handleContextMenu}
          {...leftoverProps as InputHTMLAttributes<HTMLInputElement>}
        />
      </div>

      {error && (
        <div className={styles.errorMessage}>{error}</div>
      )}
    </div>
  );
};

export default Input;
