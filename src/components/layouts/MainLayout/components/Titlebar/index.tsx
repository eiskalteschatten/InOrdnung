import React, { useEffect, useState } from 'react';
import { IpcRendererEvent } from 'electron';

import config from '../../../../../config';

import styles from './styles.module.scss';

const Titlebar: React.FC = () => {
  const [title, setTitle] = useState<string>(config.app.name);

  const handleDoubleClick = () => {
    window.api.send('maximizeOrUnmaximizeWindow');
  };

  useEffect(() => {
    window.api.on('setTitlebarTitle', (e: IpcRendererEvent, _title: string) => setTitle(_title));
  }, []);

  return (
    <div
      className={styles.titlebar}
      onDoubleClick={handleDoubleClick}
    >
      <div className={styles.title}>
        {title}
      </div>
    </div>
  );
};

export default Titlebar;
