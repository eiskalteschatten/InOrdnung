import { MenuItem } from '../../menuBuilder';

const submenuItems: MenuItem[] = [
  {
    platforms: ['darwin'],
    item: { role: 'minimize' },
  },
  {
    platforms: ['darwin'],
    item: { role: 'zoom' },
  },
  {
    platforms: ['darwin'],
    item: { type: 'separator' },
  },
  {
    platforms: ['darwin'],
    item: { role: 'front' },
  },
];

const menuItem: MenuItem = {
  item: {
    role: 'window',
  },
  submenu: submenuItems,
};

export default menuItem;
