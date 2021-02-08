import { ProjectDeleteImage, ProjectSetProject, ProjectSetProjectInfo } from '.';
import { Project } from '../../../interfaces/project';
import { ProjectInfo } from '../../../interfaces/projectInfo';

import {
  PROJECT_SET_PROJECT,
  PROJECT_SET_PROJECT_INFO,
  PROJECT_DELETE_IMAGE,
} from '../../constants';

export const projectSetProject = (payload: Project): ProjectSetProject => ({ type: PROJECT_SET_PROJECT, payload });
export const projectSetProjectInfo = (payload: ProjectInfo): ProjectSetProjectInfo => ({ type: PROJECT_SET_PROJECT_INFO, payload });
export const projectDeleteImage = (): ProjectDeleteImage => ({ type: PROJECT_DELETE_IMAGE });
