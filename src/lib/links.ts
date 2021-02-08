import { MouseEvent } from 'react';

const { shell } = window.require('electron');

export const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>): void => {
  e.preventDefault();

  const target = e.target as HTMLAnchorElement;
  const href = target.getAttribute('href');

  if (href) {
    shell.openExternal(href);
  }
};
