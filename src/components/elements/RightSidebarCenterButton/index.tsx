import React, { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

const RightSidebarCenterButton: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.buttonWrapper}>
      {children}
    </div>
  );
};

export default RightSidebarCenterButton;
