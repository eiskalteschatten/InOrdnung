import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles, Theme } from '@material-ui/core/styles';

import styles from './SidebarItem.module.scss';

const useStyles = makeStyles((theme: Theme) => ({
  selected: {
    color: theme.palette.primary.main,
    borderLeft: `5px solid ${theme.palette.primary.main}`,
  },
}));

export interface Props {
  path: string;
  ItemIcon: any;
  title: string;
}

const SidebarItem: React.FC<Props> = ({ ItemIcon, title, path }) => {
  const location = useLocation();
  const classes = useStyles();

  if (path.charAt(path.length -1) === '/') {
    path = path.slice(0, -1);
  }

  return (
    <Link
      to={path}
      className={clsx({
        [styles.sidebarItem]: true,
        [classes.selected]: location.pathname === path,
        [styles.selected]: location.pathname === path,
      })}
    >
      <ItemIcon fontSize='small' className={styles.icon} />
      <span className={styles.text}>{title}</span>
    </Link>
  );
};

export default SidebarItem;
