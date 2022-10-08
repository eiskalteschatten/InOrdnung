import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import ButtonBase from '../ButtonBase';

import styles from './styles.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  to: string;
}

const SidebarButton: React.FC<Props> = ({ children, className, icon, to, ...leftoverProps }) => {
  // const handleContextMenu = () => {
  //   window.api.send('openEmailSidebarFolderContextMenu');
  // };

  return (
    <NavLink to={to} className={styles.link}>
      {({ isActive }) => (
        <ButtonBase
          className={clsx(styles.button, className, {
            [styles.active]: isActive,
          })}
          {...leftoverProps}
        >
          {icon && (
            <div className={styles.icon}>
              {icon}
            </div>
          )}

          <div className={styles.contents}>
            {children}
          </div>
        </ButtonBase>
      )}
    </NavLink>
  );
};

export default SidebarButton;
