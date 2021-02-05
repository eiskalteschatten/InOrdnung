import { BrowserWindow, BrowserWindowConstructorOptions, dialog, Menu, nativeTheme } from 'electron';
import path from 'path';

import initializeRenderer from '../initializeRenderer';
import appMenu from '../appMenus/project';
import { getTranslation } from '../../lib/helper';
import { ProjectFile } from '../../interfaces/project';
import { createThumbnail } from '../lib/images';
import { addToRecentProjects } from '../lib/projectFile';

const translation = getTranslation();

export const windows = new Set();

export default async (projectFile?: ProjectFile, filePath?: string): Promise<BrowserWindow> => {
  // if (process.env.NODE_ENV === 'development') {
  //   const { default: installExtension, REDUX_DEVTOOLS } = await import('electron-devtools-installer');
  //   await installExtension(REDUX_DEVTOOLS);
  // }

  // const preferences = load window preferences here;

  const browserWindowOptions: BrowserWindowConstructorOptions = {
    width: 1000, // preferences.windowWidth || 1000,
    height: 650, // preferences.windowHeight || 650,
    icon: path.join(__dirname, '../../assets/images/icon128.png'),
    webPreferences: {
      nodeIntegration: true,
    },
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#222222' : '#f0f0f0',
  };

  // if (preferences.windowX && preferences.windowY) {
  //   browserWindowOptions.x = preferences.windowX;
  //   browserWindowOptions.y = preferences.windowY;
  // }

  const newWindow = new BrowserWindow(browserWindowOptions);

  if (newWindow) {
    // if (preferences.windowIsMaximized) {
    //   newWindow.maximize();
    // }

    // newWindow.setFullScreen(preferences.windowIsFullScreen || false);

    newWindow.loadURL(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/project'
        : `file://${path.join(__dirname, '../index.html#project')}`
    );

    newWindow.on('close', (e: Event) => onClose(e, newWindow));
    newWindow.on('closed', () => closed(newWindow));

    newWindow.webContents.on('did-finish-load', async (): Promise<void> => {
      initializeRenderer(newWindow);

      if (projectFile && filePath) {
        newWindow.webContents.send('openProject', projectFile, filePath);
        await addToRecentProjects(filePath, projectFile.project.projectInfo.image?.image, projectFile.project.projectInfo.image?.mimeType);
      }
    });

    newWindow.on('focus', () => {
      const menu = Menu.buildFromTemplate(appMenu);
      Menu.setApplicationMenu(menu);
    });

    windows.add(newWindow);
  }

  return newWindow;
};

const onClose = async (e: Event, window: BrowserWindow | undefined): Promise<void> => {
  try {
    if (window) {
      if (window.isDocumentEdited()) {
        const result = await dialog.showMessageBox({
          message: translation.projectClosedUnsavedProjectConfimration,
          detail: translation.projectClosedUnsavedProjectDetail,
          buttons: [translation.save, translation.dontSave, translation.cancel],
          type: 'warning',
          defaultId: 0,
        });

        if (result.response === 2) {
          e.preventDefault();
        }
        else if (result.response === 0) {
          e.preventDefault();
          window?.webContents.send('saveProject', true);
        }
      }

      // const windowBounds = window.getBounds();

      // const windowPreferences = {
      //   windowWidth: windowBounds.width,
      //   windowHeight: windowBounds.height,
      //   windowX: windowBounds.x,
      //   windowY: windowBounds.y,
      //   windowIsFullScreen: window.isFullScreen(),
      //   windowIsMaximized: window.isMaximized(),
      // };
    }
  }
  catch (error) {
    console.error(error);
  }
};

const closed = (window: BrowserWindow | undefined): void => {
  if (window) {
    windows.delete(window);
    window = undefined;
  }
};
