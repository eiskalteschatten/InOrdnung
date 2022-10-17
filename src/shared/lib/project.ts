import { dispatch, getState } from '../../store';
import { bookmarkSelectors } from '../../store/entities/project/bookmarks';
import { setTaskLists, setTasks, taskListSelectors, taskSelectors } from '../../store/entities/project/tasks';
import { setBookmarks } from '../../store/entities/project/bookmarks';
import { setProjectInfo } from '../../store/entities/project/info';
import { setGeneralUiPreferences } from '../../store/entities/ui/preferences/general';
import { setBookmarkUiPreferences } from '../../store/entities/ui/preferences/bookmarks';
import { setTaskUiPreferences } from '../../store/entities/ui/preferences/tasks';
import { setFileMetaData } from '../../store/entities/file';

import { ProjectFile } from '../interfaces/file';

export const serializeProjectForSaving = (): ProjectFile => {
  const state = getState();

  return {
    ui: state.ui.preferences,
    project: {
      info: state.project.info,
      bookmarks: bookmarkSelectors.selectAll(state),
      tasks: taskSelectors.selectAll(state),
      taskLists: taskListSelectors.selectAll(state),
    },
  };
};

export const setProjectFromFile = (projectFile: ProjectFile, path: string) => {
  dispatch(setProjectInfo(projectFile.project.info));

  dispatch(setBookmarks(projectFile.project.bookmarks || []));

  dispatch(setTasks(projectFile.project.tasks || []));
  dispatch(setTaskLists(projectFile.project.taskLists || []));

  dispatch(setGeneralUiPreferences(projectFile.ui.general));
  dispatch(setBookmarkUiPreferences(projectFile.ui.bookmarks || {}));
  dispatch(setTaskUiPreferences(projectFile.ui.tasks || {}));

  dispatch(setFileMetaData({
    path,
    fileLoaded: true,
    saved: true,
  }));
};
