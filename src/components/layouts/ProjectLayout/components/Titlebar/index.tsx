import React from 'react';

import config from '../../../../../config';
import { useAppSelector } from '../../../../../store/hooks';

import styles from './styles.module.scss';

const Titlebar: React.FC = () => {
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
    </div>
  );
};

export default Titlebar;
