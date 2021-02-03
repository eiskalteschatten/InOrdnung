import { Action } from 'redux';

import { ProjectFileMetaData } from '../../interfaces/project';

import {
  FILE_SET_META_DATA,
  FILE_SET_SAVED,
  FILE_SET_LOADED,
} from '../constants';

export interface FileSetMetaData extends Action<typeof FILE_SET_META_DATA> {
  payload: ProjectFileMetaData;
}

export interface FileSetSaved extends Action<typeof FILE_SET_SAVED> {
  payload: boolean;
}

export interface FileSetLoaded extends Action<typeof FILE_SET_LOADED> {
  payload: boolean;
}

export type FileActions =
  FileSetMetaData |
  FileSetSaved |
  FileSetLoaded;

export const fileSetMetaData = (payload: ProjectFileMetaData): FileSetMetaData => ({ type: FILE_SET_META_DATA, payload });
export const fileSetSaved = (payload: boolean): FileSetSaved => ({ type: FILE_SET_SAVED, payload });
export const fileSetLoaded = (payload: boolean): FileSetLoaded => ({ type: FILE_SET_LOADED, payload });
