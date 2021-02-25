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

const { ipcRenderer } = window.require('electron');

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
    ipcRenderer.on('newTask', (): void => {
      dispatch(uiSetOpenEditTaskDialog(true));
      history.push(`${path}/tasks`);
    });

    ipcRenderer.on('newQuickNote', (): void => {
      dispatch(uiSetOpenEditQuickNoteDialog(true));
      history.push(`${path}/quick-notes`);
    });

    ipcRenderer.on('newBookmark', (): void => {
      dispatch(uiSetOpenEditBookmarkDialog(true));
      history.push(`${path}/bookmarks`);
    });

    return () => {
      ipcRenderer.removeAllListeners('newTask');
      ipcRenderer.removeAllListeners('newQuickNote');
      ipcRenderer.removeAllListeners('newBookmark');
    };
  }, []);

  useEffect(() => {
    document.title = project.projectInfo.name || untitled;
  }, [project, untitled]);

  useEffect(() => {
    dispatch(fileSetSaved(false));

    if (file.fileLoaded) {
      if (!isEqual(project, projectInitialState)) {
        ipcRenderer.send('projectIsEdited');
      }

      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }

      setAutoSaveTimeout(setTimeout(() => {
        ipcRenderer.send('saveProject', { project, ui }, file);
      }, 1000));
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
