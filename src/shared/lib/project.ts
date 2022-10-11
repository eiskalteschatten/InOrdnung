import { getState } from '../../store';
import { ProjectFile } from '../interfaces/file';

export const getProjectForSaving = (): ProjectFile => {
  const { project, ui } = getState();

  return {
    ui: ui.preferences,
    project: {
      info: project.info,
      bookmarks: project.bookmarks.data,
    },
  };
};
