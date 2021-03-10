import { app, autoUpdater } from 'electron';

import config from '../../../../config';
import { getTranslation } from '../../../lib/helper';
import { MenuItem } from '../../menuBuilder';
import openAboutWindow from '../../../windows/about';

export default (): MenuItem => {
  const translation = getTranslation();

  const submenuItems: MenuItem[] = [
    {
      item: {
        label: `${translation.menuAbout} ${config.app.name}`,
        click: (): void => {
          openAboutWindow();
        },
      },
    },
    {
      item: {
        label: translation.menuCheckForUpdates,
        click: (): void => {
          autoUpdater.checkForUpdates();
        },
      },
    },
    { item: { type: 'separator' } },
    { item: { role: 'services', submenu: [] } },
    { item: { type: 'separator' } },
    { item: { role: 'hide' } },
    { item: { role: 'hideOthers' } },
    { item: { role: 'unhide' } },
    { item: { type: 'separator' } },
    { item: { role: 'quit' } },
  ];

  const menuItem: MenuItem = {
    platforms: ['darwin'],
    item: {
      label: app?.getName(),
    },
    submenu: submenuItems,
  };

  return menuItem;
};
