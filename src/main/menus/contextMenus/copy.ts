import { MenuItemConstructorOptions } from 'electron';

import { MenuItem, buildMenu } from '../menuBuilder';
import i18n from '../../../i18n/main';

const { t } = i18n;

export default (): MenuItemConstructorOptions[] => {
  const menuItems: MenuItem[] = [
    {
      item: {
        label: t('appMenu:copy'),
        role: 'copy',
      },
    },
  ];

  return buildMenu(menuItems);
};
