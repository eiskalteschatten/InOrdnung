import React, { PropsWithChildren } from 'react';

import config from '../../../../../config';
import { useAppSelector } from '../../../../../store/hooks';

import styles from './styles.module.scss';

const Titlebar: React.FC<PropsWithChildren> = ({ children }) => {
  const projectName = useAppSelector(state => state.project.info.name);

  const handleDoubleClick = () => {
    window.api.send('maximizeOrUnmaximizeWindow');
  };

  return (
    <div
      className={styles.titlebar}
      onDoubleClick={handleDoubleClick}
    >
      <div className={styles.title}>
        {projectName || config.app.name}
      </div>

      <div>
        {children}
      </div>
    </div>
  );
};

export default Titlebar;
