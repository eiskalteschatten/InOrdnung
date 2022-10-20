import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';

import Button from '../../../../elements/Button';

import styles from './styles.module.scss';

const Titlebar: React.FC<PropsWithChildren> = ({ children }) => {
  const handleDoubleClick = () => {
    window.api.send('maximizeOrUnmaximizeWindow');
  };

  return (
    <div
      className={styles.titlebar}
      onDoubleClick={handleDoubleClick}
    >
      <div className={clsx(styles.navButtons, styles.noDrag)}>
        <Button>
          <span className='material-icons'>arrow_back_ios</span>
        </Button>

        <Button>
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
