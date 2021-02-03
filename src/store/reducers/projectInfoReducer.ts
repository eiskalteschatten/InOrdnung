import { Reducer } from 'redux';

import { ProjectInfo } from '../../interfaces/project';
import { ProjectInfoActions } from '../actions/projectInfoActions';

import {
  PROJECT_INFO_SET_INFO,
} from '../constants';

export const initialState: ProjectInfo = {
};

const projectInfoReducer: Reducer<ProjectInfo, ProjectInfoActions> = (
  state = initialState,
  action: ProjectInfoActions
): any => {
  switch (action.type) {
    case PROJECT_INFO_SET_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default projectInfoReducer;
