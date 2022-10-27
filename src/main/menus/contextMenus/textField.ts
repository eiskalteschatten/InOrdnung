import { MenuItemConstructorOptions } from 'electron';

import { MenuItem, buildMenu } from '../menuBuilder';
import i18n from '../../../i18n/main';

const { t } = i18n;

export default (): MenuItemConstructorOptions[] => {
  const menuItems: MenuItem[] = [
    {
      item: {
        label: t('appMenu:cut'),
        role: 'cut',
      },
    },
    {
      item: {
        label: t('appMenu:copy'),
        role: 'copy',
      },
    },
    {
      item: {
        label: t('appMenu:paste'),
        role: 'paste',
      },
    },
    {
      item: { type: 'separator' },
    },
    {
      item: {
        label: t('appMenu:selectAll'),
        role: 'selectAll',
      },
    },
  ];

  return buildMenu(menuItems);
};
