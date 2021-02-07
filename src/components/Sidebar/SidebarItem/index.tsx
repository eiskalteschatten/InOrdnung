import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import styles from './SidebarItem.module.scss';

export interface Props {
  path: string;
  ItemIcon: any;
  title: string;
}

const SidebarItem: React.FC<Props> = ({ ItemIcon, title, path }) => {
  const location = useLocation();

  if (path.charAt(path.length -1) === '/') {
    path = path.slice(0, -1);
  }

  return (
    <Link
      to={path}
      className={clsx({
        [styles.sidebarItem]: true,
        [styles.selected]: location.pathname === path,
      })}
    >
      <ItemIcon className={styles.icon} />
      <span className={styles.text}>{title}</span>
    </Link>
  );
};

export default SidebarItem;
