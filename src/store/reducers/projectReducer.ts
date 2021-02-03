import { Reducer } from 'redux';

import { ProjectFile } from '../../interfaces/project';
import { ProjectActions } from '../actions/projectActions';

import {
  PROJECT_SET_PROJECT_INFO,
  PROJECT_DELETE_IMAGE,
} from '../constants';

export const initialState: ProjectFile = {
  projectInfo: {},
};

const projectInfoReducer: Reducer<ProjectFile, ProjectActions> = (
  state = initialState,
  action: ProjectActions
): any => {
  switch (action.type) {
    case PROJECT_SET_PROJECT_INFO:
      return {
        ...state,
        projectInfo: action.payload,
      };
    case PROJECT_DELETE_IMAGE:
      delete state.projectInfo.image;
      return state;
    default:
      return state;
  }
};

export default projectInfoReducer;
