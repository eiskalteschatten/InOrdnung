import React from 'react';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
}

const Toolbar: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.toolbar}>
      {children}
    </div>
  );
};

export default Toolbar;
