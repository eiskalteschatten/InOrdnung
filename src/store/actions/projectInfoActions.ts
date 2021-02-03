import { Action } from 'redux';

import { ProjectInfo } from '../../interfaces/project';

import {
  PROJECT_INFO_SET_INFO,
} from '../constants';

export interface ProjectInfoSetInfo extends Action<typeof PROJECT_INFO_SET_INFO> {
  payload: ProjectInfo;
}

export type ProjectInfoActions = ProjectInfoSetInfo;

export const projectInfoSetInfo = (payload: ProjectInfo): ProjectInfoSetInfo => ({ type: PROJECT_INFO_SET_INFO, payload });
