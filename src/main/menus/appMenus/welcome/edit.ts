// import { BrowserWindow, MenuItem as ElectronMenuItem } from 'electron';

import { getTranslation } from '../../../lib/helper';
import { MenuItem } from '../../menuBuilder';

export default (): MenuItem => {
  const translation = getTranslation();

  const submenuItems: MenuItem[] = [
    {
      item: {
        label: translation.cut,
        role: 'cut',
      },
    },
    {
      item: {
        label: translation.copy,
        role: 'copy',
      },
    },
    {
      item: {
        label: translation.paste,
        role: 'paste',
      },
    },
    {
      platforms: ['darwin'],
      item: { type: 'separator' },
    },
    {
      platforms: ['darwin'],
      item: {
        label: translation.speech,
      },
      submenu: [
        {
          item: {
            label: translation.startSpeaking,
            role: 'startSpeaking',
          },
        },
        {
          item: {
            label: translation.stopSpeaking,
            role: 'stopSpeaking',
          },
        },
      ],
    },
    // {
    //   platforms: nonMacPlatforms,
    //   item: { type: 'separator' },
    // },
    // {
    //   platforms: nonMacPlatforms,
    //   item: {
    //     label: translation.preferences,
    //     accelerator: 'Ctrl+,',
    //     click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
    //       focusedWindow?.webContents.send('open-preferences');
    //     },
    //   },
    // },
  ];

  const menuItem: MenuItem = {
    item: {
      label: translation.edit,
    },
    submenu: submenuItems,
  };

  return menuItem;
};
