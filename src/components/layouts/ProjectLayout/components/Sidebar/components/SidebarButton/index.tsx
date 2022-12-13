import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  to: string;
  end?: boolean;
}

const SidebarButton: React.FC<Props> = ({ children, className, icon, to, end, ...leftoverProps }) => {
  // const handleContextMenu = () => {
  //   window.api.send('openEmailSidebarFolderContextMenu');
  // };

  return (
    <NavLink to={to} className={styles.link} end={end}>
      {({ isActive }) => (
        <div
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
        </div>
      )}
    </NavLink>
  );
};

export default SidebarButton;
