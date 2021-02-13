import { getTranslation } from '../../../../lib/helper';
import { MenuItem } from '../../menuBuilder';

const translation = getTranslation();

const submenuItems: MenuItem[] = [
  { item: { role: 'resetZoom' } },
  { item: { role: 'zoomIn' } },
  { item: { role: 'zoomOut' } },
  { item: { type: 'separator' } },
  { item: { role: 'togglefullscreen' } },
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

export default menuItem;
