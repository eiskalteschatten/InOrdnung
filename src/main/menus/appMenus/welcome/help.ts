import { shell } from 'electron';

import config from '../../../../config';
import { getTranslation } from '../../../lib/helper';
import checkForUpdates from '../../../lib/checkForUpdates';
import { MenuItem, nonMacPlatforms } from '../../menuBuilder';
import openAboutWindow from '../../../windows/about';

export default (): MenuItem => {
  const translation = getTranslation();

  const submenuItems: MenuItem[] = [
    {
      platforms: ['win32'],
      item: {
        label: translation.menuCheckForUpdates,
        click: (): void => {
          checkForUpdates(true);
        },
      },
    },
    {
      platforms: nonMacPlatforms,
      item: { type: 'separator' },
    },
    {
      item: {
        label: translation.menuSubmitFeedback,
        click: (): void => {
          shell.openExternal('https://www.alexseifert.com/contact');
        },
      },
    },
    {
      item: {
        label: translation.aboutAlexSeifert,
        click: (): void => {
          shell.openExternal('https://www.alexseifert.com');
        },
      },
    },
    {
      platforms: nonMacPlatforms,
      item: { type: 'separator' },
    },
    {
      platforms: nonMacPlatforms,
      item: {
        label: `${translation.menuAbout} ${config.app.name}`,
        click: (): void => {
          openAboutWindow();
        },
      },
    },
  ];

  const menuItem: MenuItem = {
    item: {
      role: 'help',
      label: translation.help,
    },
    submenu: submenuItems,
  };

  return menuItem;
};
