import config from '../../../config';

export default async <T>(type: 'main' | 'renderer'): Promise<T> => {
  const fileVersion = config.app.fileVersion.replaceAll('.', '-');

  switch (type) {
    case 'main':
      const Main = (await import(`./${fileVersion}/FileMain`)).default;
      return new Main();
    case 'renderer':
      const Renderer = (await import(`./${fileVersion}/FileRenderer`)).default;
      return new Renderer();
    default:
      throw new Error('Could not find project file type!');
  }
};
