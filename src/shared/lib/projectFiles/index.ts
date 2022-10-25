import config from '../../../config';

export default async <T>(type: 'main' | 'renderer'): Promise<T> => {
  const fileVersion = config.app.fileVersion.replaceAll('.', '-');

  switch (type) {
    case 'main':
      const Main = await import(`./${fileVersion}/FileMain`);
      return Main();
      break;
    case 'renderer':
      const Renderer = await import(`./${fileVersion}/FileRenderer`);
      return Renderer();
      break;
    default:
      throw new Error('Could not find project file type!');
  }
};
