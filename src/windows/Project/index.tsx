import React, { useEffect, useState } from 'react';
import { Route, useRouteMatch, Switch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { State } from '../../store';
import { fileSetSaved } from '../../store/actions/fileActions';
import { initialState as projectInitialState } from '../../store/reducers/projectReducer';
import useTranslation from '../../intl/useTranslation';
import Titlebar from '../../components/Titlebar';

import {
  uiSetOpenEditBookmarkDialog,
  uiSetOpenEditQuickNoteDialog,
  uiSetOpenEditTaskDialog,
} from '../../store/actions/uiTempActions';

import Sidebar from './Sidebar';
import ProjectInfo from './ProjectInfo';
import Tasks from './Tasks';
import QuickNotes from './QuickNotes';
import Bookmarks from './Bookmarks';
import Kanban from './Kanban';

import styles from './Project.module.scss';

const Project: React.FC = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const platform = useSelector((state: State) => state.app.platform);
  const project = useSelector((state: State) => state.project);
  const ui = useSelector((state: State) => state.ui);
  const file = useSelector((state: State) => state.file);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout>();
  const untitled = useTranslation('projectUntitled');

  useEffect(() => {
    window.api.on('newTask', (): void => {
      dispatch(uiSetOpenEditTaskDialog(true));
      history.push(`${path}/tasks`);
    });

    window.api.on('newQuickNote', (): void => {
      dispatch(uiSetOpenEditQuickNoteDialog(true));
      history.push(`${path}/quick-notes`);
    });

    window.api.on('newBookmark', (): void => {
      dispatch(uiSetOpenEditBookmarkDialog(true));
      history.push(`${path}/bookmarks`);
    });

    return () => {
      window.api.removeAllListeners('newTask');
      window.api.removeAllListeners('newQuickNote');
      window.api.removeAllListeners('newBookmark');
    };
  }, []);

  useEffect(() => {
    document.title = project.projectInfo.name || untitled;
  }, [project, untitled]);

  useEffect(() => {
    if (file.fileLoaded) {
      dispatch(fileSetSaved(false));
      window.api.send('projectIsEdited');

      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }

      setAutoSaveTimeout(setTimeout(() => {
        window.api.send('saveProject', { project, ui }, file);
      }, 1000));
    }
    else if (!isEqual(project, projectInitialState)) {
      dispatch(fileSetSaved(false));
      window.api.send('projectIsEdited');
    }
  }, [project, ui]);

  return (
    <div className={styles.projectLayout}>
      {platform === 'darwin' && (<Titlebar />)}

      <Sidebar />

      <div className={styles.rightView}>
        <Switch>
          <Route exact path={`${path}`} component={ProjectInfo} />
          <Route path={`${path}/tasks`} component={Tasks} />
          <Route path={`${path}/quick-notes`} component={QuickNotes} />
          <Route path={`${path}/bookmarks`} component={Bookmarks} />
          <Route path={`${path}/kanban`} component={Kanban} />
        </Switch>
      </div>
    </div>
  );
};

export default Project;
