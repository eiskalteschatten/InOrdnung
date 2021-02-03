import { WebContents } from 'electron';
import { encodeImage, getFileType, selectImage } from './images';


export const selectProjectImage = async (sender: WebContents): Promise<void> => {
  const result = await selectImage();

  const imagePath = result.filePaths[0];
  if (imagePath) {
    const image = await encodeImage(imagePath);
    const mimeType = await getFileType(imagePath);
    sender.send('updateProjectInfo', { image: { image, mimeType } });
  }
};
