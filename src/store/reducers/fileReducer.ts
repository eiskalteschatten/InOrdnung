import { Reducer } from 'redux';

import { ProjectFileMetaData } from '../../interfaces/project';
import { FileActions } from '../actions/fileActions';

import {
  FILE_SET_META_DATA,
  FILE_SET_SAVED,
  FILE_SET_LOADED,
} from '../constants';

export const initialState: ProjectFileMetaData = {
  fileLoaded: false,
  path: '',
  saved: true,
};

const fileReducer: Reducer<ProjectFileMetaData, FileActions> = (
  state = initialState,
  action: FileActions
): any => {
  switch (action.type) {
    case FILE_SET_META_DATA:
      return action.payload;
    case FILE_SET_SAVED:
      return {
        ...state,
        saved: action.payload,
      };
    case FILE_SET_LOADED:
      return {
        ...state,
        fileLoaded: action.payload,
      };
    default:
      return state;
  }
};

export default fileReducer;
