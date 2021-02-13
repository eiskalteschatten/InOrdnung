import { MenuItemConstructorOptions } from 'electron';

export interface MenuItem {
  platforms?: string[];
  item: MenuItemConstructorOptions;
  submenu?: MenuItem[];
}

const buildMenuItem = (menuItem: MenuItem): MenuItemConstructorOptions => {
  const item = Object.assign({}, menuItem.item);

  if (menuItem.submenu) {
    item.submenu = buildMenu(menuItem.submenu);
  }

  return item;
};

const buildMenu = (menuItems: MenuItem[]): MenuItemConstructorOptions[] => {
  const items = [];

  for (const menuItem of menuItems) {
    if (!menuItem.platforms || menuItem.platforms?.includes(process.platform)) {
      items.push(buildMenuItem(menuItem));
    }
  }

  return items;
};

export default (menuItem: MenuItem): MenuItemConstructorOptions => buildMenuItem(menuItem);
