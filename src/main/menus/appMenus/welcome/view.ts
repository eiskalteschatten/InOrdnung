import { getTranslation } from '../../../lib/helper';
import { MenuItem } from '../../menuBuilder';

const translation = getTranslation();

const submenuItems: MenuItem[] = [
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
