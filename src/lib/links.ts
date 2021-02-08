import { MouseEvent } from 'react';

const { shell } = window.require('electron');

export const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>): void => {
  e.preventDefault();

  const target = e.target as HTMLAnchorElement;
  const href = target.getAttribute('href');

  if (href && isValidUrl(href)) {
    shell.openExternal(href);
  }
};

export const isValidUrl = (url: string): boolean => {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(url);
};
