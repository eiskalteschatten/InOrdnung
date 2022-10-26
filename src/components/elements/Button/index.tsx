import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef, RefObject, useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import Spinner from '../Spinner';

import styles from './styles.module.scss';

interface InitialProps {
  iconButton?: boolean;
  deleteButton?: boolean;
  large?: boolean;
  primary?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  ref?: React.ForwardedRef<HTMLAnchorElement | HTMLButtonElement>;
  showLoader?: boolean;
  fullWidth?: boolean;
  centerContent?: boolean;
  contentClassName?: string;
}

interface LinkProps extends InitialProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

interface ButtonProps extends InitialProps, ButtonHTMLAttributes<HTMLButtonElement> {
  to?: undefined;
}

type Props = LinkProps | ButtonProps;

const Button: React.FC<Props> = forwardRef<HTMLAnchorElement | HTMLButtonElement, Props>((props, ref) => {
  const { children, to, iconButton, deleteButton, large, primary, icon, iconRight, showLoader, fullWidth, centerContent, contentClassName, ...leftoverProps } = props;

  const classes = useMemo(() => clsx(styles.button, props.className, {
    [styles.iconButton]: iconButton,
    [styles.deleteButton]: deleteButton,
    [styles.large]: large,
    [styles.primary]: primary,
    [styles.fullWidth]: fullWidth,
  }), [props]);

  const Content: React.FC = () => (
    <div className={clsx(styles.content, contentClassName, {
      [styles.centerContent]: centerContent,
    })}>
      {showLoader && (
        <div className={styles.loader}>
          <Spinner />
        </div>
      )}

      {icon && (
        <span className={styles.icon}>
          {icon}
        </span>
      )}

      {children}

      {iconRight && (
        <span className={styles.iconRight}>
          {iconRight}
        </span>
      )}
    </div>
  );

  return (
    <>
      {to ? (
        <Link
          ref={ref as RefObject<HTMLAnchorElement>}
          to={to}
          {...leftoverProps as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'to'>}
          className={classes}
        >
          <Content />
        </Link>
      ) : (
        <button
          ref={ref as RefObject<HTMLButtonElement>}
          {...leftoverProps as ButtonHTMLAttributes<HTMLButtonElement>}
          className={classes}
          disabled={showLoader || (props as ButtonHTMLAttributes<HTMLButtonElement>).disabled}
        >
          <Content />
        </button>
      )}
    </>
  );
});

export default Button;
