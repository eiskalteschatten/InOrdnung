import { Reducer } from 'redux';

import { Project } from '../../interfaces/project';
import { ProjectActions } from '../actions/projectActions';

import {
  PROJECT_SET_PROJECT,
  PROJECT_SET_PROJECT_INFO,
  PROJECT_DELETE_IMAGE,
} from '../constants';

export const initialState: Project = {
  projectInfo: {},
};

const projectInfoReducer: Reducer<Project, ProjectActions> = (
  state = initialState,
  action: ProjectActions
): any => {
  switch (action.type) {
    case PROJECT_SET_PROJECT:
      return action.payload;
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
