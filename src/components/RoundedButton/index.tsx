import React from 'react';
import clsx from 'clsx';

import { makeStyles, Theme } from '@material-ui/core/styles';

import styles from './RoundedButton.module.scss';

const useStyles = makeStyles((theme: Theme) => ({
  contained: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.default,
    '&:active': {
      opacity: .9,
    },
  },
}));

interface Props {
  onClick: () => void;
  children: any;
  className?: string;
  variant?: 'standard' | 'contained';
  size?: 'small' | 'standard';
  selected?: boolean;
}

const RoundedButton: React.FC<Props> = ({ onClick, children, className, variant, size, selected }) => {
  const classes = useStyles();

  return (
    <button
      className={clsx({
        [className || '']: !!className,
        [styles.base]: true,
        [styles.standard]: !variant || variant === 'standard',
        [classes.contained]: variant === 'contained',
        [styles.small]: size === 'small',
        [styles.selected]: selected,
      })}
      onClick={onClick}
    >
      <div className={styles.wrapper}>
        {children}
      </div>
    </button>
  );
};

export default RoundedButton;
