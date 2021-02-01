import { BrowserWindow, BrowserWindowConstructorOptions, Menu, nativeTheme } from 'electron';
import path from 'path';

import initializeRenderer from '../initializeRenderer';
import appMenu from '../menus/project';

export const windows = new Set();

export default async (): Promise<void> => {
  // if (process.env.NODE_ENV === 'development') {
  //   const { default: installExtension, REDUX_DEVTOOLS } = await import('electron-devtools-installer');
  //   await installExtension(REDUX_DEVTOOLS);
  // }

  // const preferences = load window preferences here;

  const browserWindowOptions: BrowserWindowConstructorOptions = {
    // width: preferences.windowWidth,
    // height: preferences.windowHeight,
    icon: path.join(__dirname, '../../assets/images/icon128.png'),
    webPreferences: {
      nodeIntegration: true
    },
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#222222' : '#ffffff'
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

    newWindow.on('closed', () => onClose(newWindow));

    newWindow.webContents.on('did-finish-load', (): void => {
      if (newWindow) {
        initializeRenderer(newWindow);
      }
    });

    newWindow.on('focus', () => {
      const menu = Menu.buildFromTemplate(appMenu);
      Menu.setApplicationMenu(menu);
    });

    windows.add(newWindow);
  }
};

const onClose = async (window: BrowserWindow | undefined): Promise<void> => {
  try {
    if (window) {
      // const windowBounds = window.getBounds();

      // const windowPreferences = {
      //   windowWidth: windowBounds.width,
      //   windowHeight: windowBounds.height,
      //   windowX: windowBounds.x,
      //   windowY: windowBounds.y,
      //   windowIsFullScreen: window.isFullScreen(),
      //   windowIsMaximized: window.isMaximized(),
      // };

      windows.delete(window);
      window = undefined;
    }
  }
  catch (error) {
    console.error(error);
  }
};
