import { Action } from 'redux';

import { Project, ProjectInfo } from '../../interfaces/project';

import {
  PROJECT_SET_PROJECT,
  PROJECT_SET_PROJECT_INFO,
  PROJECT_DELETE_IMAGE,
} from '../constants';

export interface ProjectSetProject extends Action<typeof PROJECT_SET_PROJECT> {
  payload: Project;
}

export interface ProjectSetProjectInfo extends Action<typeof PROJECT_SET_PROJECT_INFO> {
  payload: ProjectInfo;
}

export type ProjectDeleteImage = Action<typeof PROJECT_DELETE_IMAGE>;

export type ProjectActions =
  ProjectSetProject |
  ProjectSetProjectInfo |
  ProjectDeleteImage;

export const projectSetProject = (payload: Project): ProjectSetProject => ({ type: PROJECT_SET_PROJECT, payload });
export const projectSetProjectInfo = (payload: ProjectInfo): ProjectSetProjectInfo => ({ type: PROJECT_SET_PROJECT_INFO, payload });
export const projectDeleteImage = (): ProjectDeleteImage => ({ type: PROJECT_DELETE_IMAGE });
