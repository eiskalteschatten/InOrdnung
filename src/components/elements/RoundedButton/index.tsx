import React from 'react';

import styles from './RoundedButton.module.scss';

interface Props {
  onClick: () => void;
  children: any;
}

const RoundedButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button className={styles.roundedButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default RoundedButton;
