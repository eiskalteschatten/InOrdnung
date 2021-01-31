import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { State } from '../../store';
import Titlebar from '../../components/elements/Titlebar';
import Sidebar from '../../components/Sidebar';

import styles from './Project.module.scss';

const Project: React.FC = () => {
  const platform = useSelector((state: State) => state.app.platform);

  useEffect(() => {
    document.title = 'Project Name Goes Here';
  }, []);

  return (
    <div className={styles.projectLayout}>
      {platform === 'darwin' && (<Titlebar />)}

      <Sidebar />

      <div className={clsx({
        [styles.leftView]: true,
        'hasDarwinTitlebar': platform === 'darwin'
      })}>
        left view
      </div>
    </div>
  );
};

export default Project;
