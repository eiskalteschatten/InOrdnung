import { getTranslation } from '../../../../lib/helper';
import createProjectWindow from '../../../windows/project';
import { openFileDialog } from '../../../lib/projectFile';
import { MenuItem, nonMacPlatforms } from '../../menuBuilder';

const translation = getTranslation();

const submenuItems: MenuItem[] = [
  {
    item: {
      label: translation.menuNewProject,
      accelerator: 'CmdOrCtrl+N',
      click: async (): Promise<void> => {
        await createProjectWindow();
      },
    },
  },
  {
    item: {
      label: translation.menuOpen,
      accelerator: 'CmdOrCtrl+O',
      click: async (): Promise<void> => {
        await openFileDialog();
      },
    },
  },
  {
    platforms: ['darwin'],
    item: {
      label: translation.menuOpenRecent,
      role: 'recentDocuments',
      submenu:[
        {
          label: translation.menuClearMenu,
          role: 'clearRecentDocuments',
        },
      ],
    },
  },
  { item: { type: 'separator' } },
  { item: { role: 'close' } },
  {
    platforms: nonMacPlatforms,
    item: { role: 'quit' },
  },
];

const menuItem: MenuItem = {
  item: {
    label: translation.file,
  },
  submenu: submenuItems,
};

export default menuItem;
