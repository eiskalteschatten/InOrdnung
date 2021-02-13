import { MenuItemConstructorOptions } from 'electron';

import menuBuilder from '../../menuBuilder';
import appMenuItems from './app';
import fileMenuItems from './file';
import editMenuItems from './edit';
import viewMenuItems from './view';
import windowMenuItems from './window';
import helpMenuItems from './help';

const template: MenuItemConstructorOptions[] = [
  menuBuilder(fileMenuItems),
  menuBuilder(editMenuItems),
  menuBuilder(viewMenuItems),
  menuBuilder(windowMenuItems),
  menuBuilder(helpMenuItems),
];

if (process.platform === 'darwin') {
  template.unshift(menuBuilder(appMenuItems));
}

export default template;
