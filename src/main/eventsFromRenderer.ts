import { ipcMain, IpcMainEvent, BrowserWindow, Menu } from 'electron';

import createProjectWindow from './windows/project';
import { checkIfFileIsImage, encodeImage, getFileType } from './lib/images';
import projectImageCm from './cmMenus/projectImage';
import { selectProjectImage } from './lib/project';
import { writeFile } from './lib/projectFile';
import { ProjectFile, ProjectFileMetaData } from '../interfaces/project';

ipcMain.on('createNewProject', createProjectWindow);

ipcMain.on('selectProjectImage', async (e: IpcMainEvent): Promise<void> => {
  const window = BrowserWindow.fromWebContents(e.sender);
  if (window) {
    await selectProjectImage(window);
  }
});

ipcMain.on('handleProjectImageDrop', async (e: IpcMainEvent, imagePath: string): Promise<void> => {
  const fileIsImage = checkIfFileIsImage(imagePath, true);

  if (fileIsImage) {
    const image = await encodeImage(imagePath);
    const mimeType = await getFileType(imagePath);
    e.sender.send('updateProjectInfo', { image: { image, mimeType } });
  }
});

ipcMain.on('showProjectImageContextMenu', (e: IpcMainEvent): void => {
  const window = BrowserWindow.fromWebContents(e.sender);

  if (window) {
    const menu = Menu.buildFromTemplate(projectImageCm);
    menu.popup({ window });
  }
});

ipcMain.on('saveProject', async (e: IpcMainEvent, project: ProjectFile, fileMetaData: ProjectFileMetaData): Promise<void> => {
  const window = BrowserWindow.fromWebContents(e.sender);

  if (window) {
    await writeFile(project, fileMetaData, window);
  }
});

ipcMain.on('projectIsEdited', async (e: IpcMainEvent): Promise<void> => {
  const window = BrowserWindow.fromWebContents(e.sender);
  window?.setDocumentEdited(true);
});
