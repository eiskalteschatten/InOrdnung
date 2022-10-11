import { getState } from '../../store';
import { bookmarkSelectors } from '../../store/entities/project/bookmarks';

import { ProjectFile } from '../interfaces/file';

export const getProjectForSaving = (): ProjectFile => {
  const state = getState();

  return {
    ui: state.ui.preferences,
    project: {
      info: state.project.info,
      bookmarks: bookmarkSelectors.selectAll(state),
    },
  };
};
