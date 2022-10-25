import config from '../../../config';

export default async (): Promise<any> => {
  const fileVersion = config.app.fileVersion.replaceAll('.', '-');
  const Instance = (await import(`./${fileVersion}/FileRenderer`)).default;
  return new Instance();
};
