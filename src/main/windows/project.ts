import { BrowserWindow, BrowserWindowConstructorOptions, dialog, Menu, nativeTheme, screen } from 'electron';
import path from 'path';

import initializeRenderer from '../initializeRenderer';
import appMenu from '../menus/appMenus/project';
import { getTranslation } from '../../lib/helper';
import { ProjectFile } from '../../interfaces/project';
import { addToRecentProjects } from '../lib/projectFile';

const translation = getTranslation();

export const windows = new Set();

export default async (projectFile?: ProjectFile, filePath?: string): Promise<BrowserWindow> => {
  // const preferences = load window preferences here;

  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const defaultWidth = Math.floor(screenWidth * 0.6);
  const defaultHeight = Math.floor(screenHeight * 0.75);

  const browserWindowOptions: BrowserWindowConstructorOptions = {
    width: defaultWidth, // preferences.windowWidth || defaultWidth,
    height: defaultHeight, // preferences.windowHeight || defaultHeight,
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
        const { projectInfo } = projectFile.project;
        await addToRecentProjects(filePath, projectInfo.name, projectInfo.image?.image, projectInfo.image?.mimeType);
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
