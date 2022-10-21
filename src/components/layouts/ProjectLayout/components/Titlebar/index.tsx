import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';

import { useAppSelector } from '../../../../../store/hooks';
import Button from '../../../../elements/Button';

import styles from './styles.module.scss';

const Titlebar: React.FC<PropsWithChildren> = ({ children }) => {
  const { platform } = useAppSelector(state => state.app);

  return (
    <div
      className={clsx(styles.titlebar, {
        [styles.darwin]: platform === 'darwin',
      })}
      onDoubleClick={() => window.api.send('maximizeOrUnmaximizeWindow')}
    >
      <div className={clsx(styles.navButtons, styles.noDrag)}>
        {platform === 'win32' && (
          <Button
            onClick={() => window.api.send('openAppMenu')}
            className={styles.appMenu}
          >
            <span className='material-icons'>menu</span>
          </Button>
        )}

        <Button disabled>
          <span className='material-icons'>arrow_back_ios</span>
        </Button>

        <Button disabled>
          <span className='material-icons'>arrow_forward_ios</span>
        </Button>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
};

export default Titlebar;
