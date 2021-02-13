import { getTranslation } from '../../../../lib/helper';
import { MenuItem } from '../../menuBuilder';

const translation = getTranslation();

const submenuItems: MenuItem[] = [
  { item: { role: 'cut' } },
  { item: { role: 'copy' } },
  { item: { role: 'paste' } },
  { item: { role: 'pasteAndMatchStyle' } },
  { item: { role: 'delete' } },
  { item: { role: 'selectAll' } },
  {
    platforms: ['darwin'],
    item: { type: 'separator' },
  },
  {
    platforms: ['darwin'],
    item: {
      label: 'Speech',
    },
    submenu: [
      { item: { role: 'startSpeaking' } },
      { item: { role: 'stopSpeaking' } },
    ],
  },
];

const menuItem: MenuItem = {
  item: {
    label: translation.edit,
  },
  submenu: submenuItems,
};

export default menuItem;
