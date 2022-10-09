import { MenuItem, nonMacPlatforms } from '../../menuBuilder';
import i18n from '../../../../i18n/main';

const { t } = i18n;

export default (): MenuItem => {
  const submenuItems: MenuItem[] = [
    {
      item: {
        label: t('appMenu:new'),
      },
      submenu: [
        {
          item: {
            label: t('projects:newProject'),
            accelerator: 'CmdOrCtrl+N',
            click: async (): Promise<void> => {
              console.log('New Project');
            },
          },
        },
        { item: { type: 'separator' } },
        {
          item: {
            label: t('bookmarks:newBookmark'),
            click: async (): Promise<void> => {
              console.log('New Bookmark');
            },
          },
        },
      ],
    },
    { item: { type: 'separator' } },
    {
      platforms: ['darwin'],
      item: {
        label: t('appMenu:close'),
        role: 'close',
      },
    },
    {
      platforms: nonMacPlatforms,
      item: {
        label: t('appMenu:quit'),
        role: 'quit',
      },
    },
  ];

  const menuItem: MenuItem = {
    item: {
      label: t('appMenu:file'),
    },
    submenu: submenuItems,
  };

  return menuItem;
};
