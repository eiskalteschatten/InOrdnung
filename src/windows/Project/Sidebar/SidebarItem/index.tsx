import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import {
  makeStyles,
  Theme,
  ButtonBase,
} from '@material-ui/core';

import styles from './SidebarItem.module.scss';

const useStyles = makeStyles((theme: Theme) => ({
  selected: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.dark,
    borderLeft: `5px solid ${theme.palette.primary.main} !important`,
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
    <ButtonBase
      component={Link}
      to={path}
      className={clsx({
        [styles.sidebarItem]: true,
        [classes.selected]: location.pathname === path,
        [styles.selected]: location.pathname === path,
      })}
    >
      <ItemIcon fontSize='small' className={styles.icon} />
      <span className={styles.text}>{title}</span>
    </ButtonBase>
  );
};

export default SidebarItem;
