import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  sidebarDragger: {
    width: 3,
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    cursor: 'ew-resize',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
}));

const SidebarDragger: React.FC = () => {
  const classes = useStyles();

  return (
    <div
      className={classes.sidebarDragger}
    />
  );
};

export default SidebarDragger;
