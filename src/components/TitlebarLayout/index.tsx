import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { State } from '../../store';
import Titlebar from '../elements/Titlebar';

import styles from './TitlebarLayout.module.scss';

interface Props {
  children: any;
}

const TitlebarLayout: React.FC<Props> = ({ children }) => {
  const platform = useSelector((state: State) => state.app.platform);

  return (
    <div
      className={clsx({
        [styles.isDarwin]: platform === 'darwin'
      })}
    >
      {platform === 'darwin' && (<Titlebar />)}
      {children}
    </div>
  );
};

export default TitlebarLayout;
