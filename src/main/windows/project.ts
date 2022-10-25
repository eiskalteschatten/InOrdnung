import { BrowserWindow, BrowserWindowConstructorOptions, dialog, Menu, nativeTheme, screen } from 'electron';
import path from 'path';
import fs, { promises as fsPromises } from 'fs';
import log from 'electron-log';

import config from '../../config/main';
import initializeRenderer from '../initializeRenderer';
import getAppMenu from '../menus/appMenus/main';
import { ProjectFile } from '../../shared/lib/projectFiles/1-0/interfaces';
import { addToRecentProjects } from '../lib/projectFile';
import i18n from '../../i18n/main';
import { WindowPreferences } from '../interfaces/windows';

const { t } = i18n;
export const windows = new Set();

const WINDOW_PREFERENCES_FILE = 'projectWindowPreferences.json';
const WINDOW_PREFERENCES_FILE_PATH = path.resolve(config.storagePath, WINDOW_PREFERENCES_FILE);

const getWindowPreferences = async (): Promise<WindowPreferences> => {
  try {
    const preferencesString = fs.existsSync(WINDOW_PREFERENCES_FILE_PATH)
      ? await fsPromises.readFile(WINDOW_PREFERENCES_FILE_PATH, 'utf8')
      : '';

    return preferencesString ? JSON.parse(preferencesString) : {};
  }
  catch (error) {
    log.error(error);
    return {};
  }
};

export default async (projectFile?: ProjectFile, filePath?: string): Promise<BrowserWindow> => {
  const preferences = await getWindowPreferences();
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const defaultWidth = Math.floor(screenWidth * 0.6);
  const defaultHeight = Math.floor(screenHeight * 0.75);

  const backgroundColor = nativeTheme.shouldUseDarkColors
    ? config.windows.defaultBackgroundColors.dark
    : config.windows.defaultBackgroundColors.light;

  const foregroundColor = nativeTheme.shouldUseDarkColors
    ? config.windows.defaultForegroundColors.dark
    : config.windows.defaultForegroundColors.light;

  const browserWindowOptions: BrowserWindowConstructorOptions = {
    width: preferences.width || defaultWidth,
    height: preferences.height || defaultHeight,
    icon: path.join(__dirname, '../../assets/images/icon128.png'),
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, '../preload.js'),
    },
    backgroundColor,
  };

  if (process.platform === 'darwin') {
    browserWindowOptions.titleBarStyle = 'hidden';
    browserWindowOptions.trafficLightPosition = { x: 10, y: 19 };
  }
  else if (process.platform === 'win32') {
    browserWindowOptions.titleBarStyle = 'hidden';
    browserWindowOptions.titleBarOverlay = {
      color: backgroundColor,
      symbolColor: foregroundColor,
    };
  }

  if (preferences.x && preferences.y) {
    browserWindowOptions.x = preferences.x;
    browserWindowOptions.y = preferences.y;
  }

  const newWindow = new BrowserWindow(browserWindowOptions);

  if (newWindow) {
    if (preferences.isMaximized) {
      newWindow.maximize();
    }

    newWindow.setFullScreen(preferences.isFullScreen || false);

    newWindow.loadURL(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../../index.html')}`
    );

    newWindow.on('resized', () => onWindowChanged({
      width: newWindow.getBounds().width,
      height: newWindow.getBounds().height,
      isMaximized: false,
    }));
    newWindow.on('moved', () => onWindowChanged({
      x: newWindow.getBounds().x,
      y: newWindow.getBounds().y,
      isMaximized: false,
    }));
    newWindow.on('maximize', () => onWindowChanged({
      isMaximized: newWindow.isMaximized(),
    }));
    newWindow.on('unmaximize', () => onWindowChanged({
      isMaximized: newWindow.isMaximized(),
    }));
    newWindow.on('enter-full-screen', () => onWindowChanged({
      isFullScreen: newWindow.isFullScreen(),
    }));
    newWindow.on('leave-full-screen', () => onWindowChanged({
      isFullScreen: newWindow.isFullScreen(),
    }));

    newWindow.on('close', (e: Event) => onClose(e, newWindow));
    newWindow.on('closed', () => closed(newWindow));

    newWindow.webContents.on('did-finish-load', async (): Promise<void> => {
      initializeRenderer(newWindow);

      if (projectFile && filePath) {
        newWindow.webContents.send('openProject', projectFile, filePath);
        const { name } = projectFile.project.info;
        await addToRecentProjects(filePath, name);
      }
    });

    newWindow.on('focus', () => {
      const menu = Menu.buildFromTemplate(getAppMenu());
      Menu.setApplicationMenu(menu);
    });

    windows.add(newWindow);
  }

  return newWindow;
};

const onWindowChanged = async (changedPreferences: WindowPreferences): Promise<void> => {
  try {
    const preferences = await getWindowPreferences();

    if (fs.existsSync(WINDOW_PREFERENCES_FILE_PATH)) {
      await fsPromises.unlink(WINDOW_PREFERENCES_FILE_PATH);
    }

    await fsPromises.writeFile(WINDOW_PREFERENCES_FILE_PATH, JSON.stringify({
      ...preferences,
      ...changedPreferences,
    }), 'utf8');
  }
  catch (error) {
    log.error(error);
  }
};

const onClose = async (e: Event, window?: BrowserWindow): Promise<void> => {
  try {
    if (window) {
      if (window.isDocumentEdited()) {
        const result = await dialog.showMessageBox({
          message: t('files:closedUnsavedProjectConfimration'),
          detail: t('files:closedUnsavedProjectDetail'),
          buttons: [t('common:save'), t('common:dontSave'), t('common:cancel')],
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
    }
  }
  catch (error) {
    log.error(error);
  }
};

const closed = (window?: BrowserWindow): void => {
  if (window) {
    windows.delete(window);
    window = undefined;
  }
};
