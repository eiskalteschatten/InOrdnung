import { Action } from 'redux';

import { ProjectInfo } from '../../interfaces/project';

import {
  PROJECT_INFO_SET_INFO,
  PROJECT_INFO_DELETE_IMAGE,
} from '../constants';

export interface ProjectInfoSetInfo extends Action<typeof PROJECT_INFO_SET_INFO> {
  payload: ProjectInfo;
}

export type ProjectInfoDeleteImage = Action<typeof PROJECT_INFO_DELETE_IMAGE>;

export type ProjectInfoActions =
  ProjectInfoSetInfo |
  ProjectInfoDeleteImage;

export const projectInfoSetInfo = (payload: ProjectInfo): ProjectInfoSetInfo => ({ type: PROJECT_INFO_SET_INFO, payload });
export const projectInfoDeleteImage = (): ProjectInfoDeleteImage => ({ type: PROJECT_INFO_DELETE_IMAGE });
