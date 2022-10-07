import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { State } from '../../../store';
import Titlebar from './components/Titlebar';
import Toolbar from './components/Toolbar';

import styles from './styles.module.scss';

interface Props {
  toolbar?: React.ReactNode;
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ toolbar, children }) => {
  const platform = useSelector((state: State) => state.app.platform);

  return (
    <div
      className={clsx(styles.mainLayout, {
        [styles.customTitlebar]: platform === 'darwin',
      })}
    >
      {platform === 'darwin' && (<Titlebar />)}

      {toolbar && (
        <Toolbar>
          {toolbar}
        </Toolbar>
      )}

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
