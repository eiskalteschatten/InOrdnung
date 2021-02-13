import { MenuItemConstructorOptions } from 'electron';

import { getTranslation } from '../../../../lib/helper';
import createProjectWindow from '../../../windows/project';
import { openFileDialog } from '../../../lib/projectFile';

const translation = getTranslation();

const menu: MenuItemConstructorOptions = {
  label: translation.file,
  submenu: [
    {
      label: translation.menuNewProject,
      accelerator: 'CmdOrCtrl+N',
      click: async (): Promise<void> => {
        await createProjectWindow();
      },
    },
    {
      label: translation.menuOpen,
      accelerator: 'CmdOrCtrl+O',
      click: async (): Promise<void> => {
        await openFileDialog();
      },
    },
    { type: 'separator' },
    { role: 'close' },
  ],
};

const menuDarwin: MenuItemConstructorOptions = {
  label: translation.file,
  submenu: [
    {
      label: translation.menuNewProject,
      accelerator: 'CmdOrCtrl+N',
      click: async (): Promise<void> => {
        await createProjectWindow();
      },
    },
    {
      label: translation.menuOpen,
      accelerator: 'CmdOrCtrl+O',
      click: async (): Promise<void> => {
        await openFileDialog();
      },
    },
    {
      label: translation.menuOpenRecent,
      role: 'recentDocuments',
      submenu:[
        {
          label: translation.menuClearMenu,
          role: 'clearRecentDocuments',
        },
      ],
    },
    { type: 'separator' },
    { role: 'close' },
  ],
};

export default process.platform === 'darwin' ? menuDarwin : menu;
