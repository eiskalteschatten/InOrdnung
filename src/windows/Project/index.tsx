import React, { useEffect, useState } from 'react';
import { Route, useRouteMatch, Switch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { State } from '../../store';
import { uiSetOpenEditBookmarkDialog, uiSetOpenEditTaskDialog } from '../../store/actions/uiActions';
import { fileSetSaved } from '../../store/actions/fileActions';
import { initialState as projectInitialState } from '../../store/reducers/projectReducer';
import Sidebar from './Sidebar';
import useTranslation from '../../intl/useTranslation';

import ProjectInfo from './ProjectInfo';
import Tasks from './Tasks';
import Bookmarks from './Bookmarks';

import styles from './Project.module.scss';

const { ipcRenderer } = window.require('electron');

const Project: React.FC = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const project = useSelector((state: State) => state.project);
  const ui = useSelector((state: State) => state.ui);
  const file = useSelector((state: State) => state.file);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout>();
  const untitled = useTranslation('projectUntitled');

  useEffect(() => {
    ipcRenderer.on('newBookmark', (): void => {
      dispatch(uiSetOpenEditBookmarkDialog(true));
      history.push(`${path}/bookmarks`);
    });

    ipcRenderer.on('newTask', (): void => {
      dispatch(uiSetOpenEditTaskDialog(true));
      history.push(`${path}/tasks`);
    });

    return () => {
      ipcRenderer.removeAllListeners('newBookmark');
      ipcRenderer.removeAllListeners('newTask');
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
      <Sidebar />

      <div className={styles.rightView}>
        <Switch>
          <Route exact path={`${path}`} component={ProjectInfo} />
          <Route path={`${path}/tasks`} component={Tasks} />
          <Route path={`${path}/bookmarks`} component={Bookmarks} />
        </Switch>
      </div>
    </div>
  );
};

export default Project;
