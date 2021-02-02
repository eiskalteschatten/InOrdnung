import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import clsx from 'clsx';

import styles from './SidebarItem.module.scss';

export interface Props {
  path: string;
  iconClass: string;
  title: string;
}

const SidebarItem: React.FC<Props> = ({ iconClass, title, path }) => {
  const { path: currentPath } = useRouteMatch();

  if (path.charAt(path.length -1) === '/') {
    path = path.slice(0, -1);
  }

  return (
    <Link
      to={path}
      className={clsx({
        [styles.sidebarItem]: true,
        [styles.selected]: currentPath === path,
      })}
    >
      <i className={clsx(iconClass, styles.icon)}/>
      <span className={styles.text}>{title}</span>
    </Link>
  );
};

export default SidebarItem;
