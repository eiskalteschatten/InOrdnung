import { Action } from 'redux';

import { ProjectInfo } from '../../interfaces/project';

import {
  PROJECT_SET_PROJECT_INFO,
} from '../constants';

export interface ProjectSetProjectInfo extends Action<typeof PROJECT_SET_PROJECT_INFO> {
  payload: ProjectInfo;
}

export type ProjectActions = ProjectSetProjectInfo;

export const projectSetProjectInfo = (payload: ProjectInfo): ProjectSetProjectInfo => ({ type: PROJECT_SET_PROJECT_INFO, payload });
