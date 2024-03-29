import { dispatch, getState } from '../../../../store';
import { bookmarkSelectors } from '../../../../store/entities/project/bookmarks';
import { setCurrentTaskNumber, setTaskLists, setTasks, taskListSelectors, taskSelectors } from '../../../../store/entities/project/tasks';
import { setBookmarks } from '../../../../store/entities/project/bookmarks';
import { setProjectInfo } from '../../../../store/entities/project/info';
import { setGeneralUiPreferences } from '../../../../store/entities/ui/preferences/general';
import { setBookmarkUiPreferences } from '../../../../store/entities/ui/preferences/bookmarks';
import { setTaskUiPreferences } from '../../../../store/entities/ui/preferences/tasks';
import { setFileMetaData } from '../../../../store/entities/file';

import AbstractFileRenderer from '../AbstractFileRenderer';
import { ProjectFile } from './interfaces';

export default class FileRenderer extends AbstractFileRenderer<ProjectFile> {
  serializeProjectForSaving(): ProjectFile {
    const state = getState();

    return {
      ui: state.ui.preferences,
      project: {
        info: state.project.info,
        bookmarks: bookmarkSelectors.selectAll(state),
        currentTaskNumber: state.project.tasks.currentTaskNumber,
        tasks: taskSelectors.selectAll(state),
        taskLists: taskListSelectors.selectAll(state),
      },
    };
  }

  setProjectFromFile(projectFile: ProjectFile, path: string) {
    dispatch(setProjectInfo(projectFile.project.info));

    dispatch(setBookmarks(projectFile.project.bookmarks || []));

    dispatch(setTasks(projectFile.project.tasks || []));
    dispatch(setTaskLists(projectFile.project.taskLists || []));
    dispatch(setCurrentTaskNumber(projectFile.project.currentTaskNumber));

    dispatch(setGeneralUiPreferences(projectFile.ui.general));
    dispatch(setBookmarkUiPreferences(projectFile.ui.bookmarks || {}));
    dispatch(setTaskUiPreferences(projectFile.ui.tasks || {}));

    dispatch(setFileMetaData({
      path,
      fileLoaded: true,
      saved: true,
    }));
  }
}
