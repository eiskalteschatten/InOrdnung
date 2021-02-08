import { ProjectDeleteImage, ProjectSetProjectInfo } from '.';
import { ProjectInfo } from '../../../interfaces/projectInfo';

import {
  PROJECT_SET_PROJECT_INFO,
  PROJECT_DELETE_IMAGE,
} from '../../constants';

export const projectSetProjectInfo = (payload: ProjectInfo): ProjectSetProjectInfo => ({ type: PROJECT_SET_PROJECT_INFO, payload });
export const projectDeleteImage = (): ProjectDeleteImage => ({ type: PROJECT_DELETE_IMAGE });
