import { BrowserWindow } from 'electron';
import { encodeImage, getFileType, selectImage } from './images';


export const selectProjectImage = async (window: BrowserWindow): Promise<void> => {
  const { filePaths, canceled } = await selectImage(window);

  if (!canceled) {
    const imagePath = filePaths[0];

    if (imagePath) {
      const image = await encodeImage(imagePath);
      const mimeType = await getFileType(imagePath);
      window.webContents.send('updateProjectInfo', { image: { image, mimeType } });
    }
  }
};
