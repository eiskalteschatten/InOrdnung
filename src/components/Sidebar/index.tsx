import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { State } from '../../store';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const platform = useSelector((state: State) => state.app.platform);

  return (
    <div className={clsx({
      [styles.sidebar]: true,
      'hasDarwinTitlebar': platform === 'darwin'
    })}>
      This is the Sidebar view
    </div>
  );
};

export default Sidebar;
