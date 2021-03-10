import { getTranslation } from '../../../lib/helper';
import { MenuItem } from '../../menuBuilder';

export default (): MenuItem => {
  const translation = getTranslation();

  const submenuItems: MenuItem[] = [
    {
      item: {
        label: translation.menuResetZoom,
        role: 'resetZoom',
      },
    },
    {
      item: {
        label: translation.menuZoomIn,
        role: 'zoomIn',
      },
    },
    {
      item: {
        label: translation.menuZoomOut,
        role: 'zoomOut',
      },
    },
    {
      platforms: ['darwin'],
      item: {
        type: 'separator',
      },
    },
    {
      platforms: ['darwin'],
      item: {
        label: translation.menuTogglefullscreen,
        role: 'togglefullscreen',
      },
    },
    { item: { type: 'separator' } },
    {
      item: {
        label: translation.menuDevelopment,
      },
      submenu: [
        { item: { role: 'reload' } },
        { item: { role: 'forceReload' } },
        { item: { role: 'toggleDevTools' } },
      ],
    },
  ];

  const menuItem: MenuItem = {
    item: {
      label: translation.view,
    },
    submenu: submenuItems,
  };

  return menuItem;
};
