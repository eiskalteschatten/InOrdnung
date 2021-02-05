import React from 'react';
import clsx from 'clsx';

import styles from './RoundedButton.module.scss';

interface Props {
  onClick: () => void;
  children: any;
  className?: string;
}

const RoundedButton: React.FC<Props> = ({ onClick, children, className }) => {
  return (
    <button
      className={clsx(styles.roundedButton, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default RoundedButton;
