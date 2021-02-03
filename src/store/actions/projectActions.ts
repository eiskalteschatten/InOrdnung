import { Action } from 'redux';

import { ProjectInfo } from '../../interfaces/project';

import {
  PROJECT_SET_PROJECT_INFO,
  PROJECT_DELETE_IMAGE,
} from '../constants';

export interface ProjectSetProjectInfo extends Action<typeof PROJECT_SET_PROJECT_INFO> {
  payload: ProjectInfo;
}

export type ProjectDeleteImage = Action<typeof PROJECT_DELETE_IMAGE>;

export type ProjectActions =
  ProjectSetProjectInfo |
  ProjectDeleteImage;

export const projectSetProjectInfo = (payload: ProjectInfo): ProjectSetProjectInfo => ({ type: PROJECT_SET_PROJECT_INFO, payload });
export const projectDeleteImage = (): ProjectDeleteImage => ({ type: PROJECT_DELETE_IMAGE });
