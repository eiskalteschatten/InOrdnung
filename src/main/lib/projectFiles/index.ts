import config from '../../../config/main';

export default async (): Promise<any> => {
  const fileVersion = config.app.fileVersion.replaceAll('.', '-');
  const Instance = (await import(`./${fileVersion}/FileMain`)).default;
  return new Instance();
};
