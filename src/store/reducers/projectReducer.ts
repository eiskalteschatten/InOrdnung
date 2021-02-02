import { Reducer } from 'redux';

import { ProjectFileMetaData, ProjectFile } from '../../interfaces/project';
import { ProjectActions } from '../actions/projectActions';

import {
  PROJECT_SET_PROJECT_INFO,
} from '../constants';

export interface ProjectState {
  fileMetaData: ProjectFileMetaData;
  data: ProjectFile;
}

export const initialState: ProjectState = {
  fileMetaData: {
    fileLoaded: false,
    path: '',
    saved: true,
  },
  data: {
    projectInfo: {},
  },
};

const appReducer: Reducer<ProjectState, ProjectActions> = (
  state = initialState,
  action: ProjectActions
): any => {
  switch (action.type) {
    case PROJECT_SET_PROJECT_INFO:
      return {
        ...state,
        projectInfo: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
