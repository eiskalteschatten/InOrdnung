export interface Config {
  app: {
    name: string;
    version: string;
  };
  updates: {
    url: string;
  };
}

export default {
  app: {
    name: 'InOrdnung',
    version: '1.0.0'
  },
  updates: {
    url: 'update url'
  }
} as Config;
