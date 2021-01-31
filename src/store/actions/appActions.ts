import { Action } from 'redux';

import {
  APP_PLATFORM,
  APP_PROCESS_VERSIONS
} from '../constants';

export interface AppSetPlatform extends Action<typeof APP_PLATFORM> {
  platform: string;
}

export interface AppSetProcessVersions extends Action<typeof APP_PROCESS_VERSIONS> {
  versions: string;
}

export type AppActions = AppSetPlatform;

export const appSetPlatform = (platform: string): AppSetPlatform => ({ type: APP_PLATFORM, platform });
export const appSetProcessVersions = (versions: string): AppSetProcessVersions => ({ type: APP_PROCESS_VERSIONS, versions });
