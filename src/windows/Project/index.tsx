import React, { useEffect, useState } from 'react';
import { Route, useRouteMatch, Switch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { State } from '../../store';
import { appSetOpenNewBookmarkDialog } from '../../store/actions/appActions';
import { fileSetSaved } from '../../store/actions/fileActions';
import { initialState as projectInitialState } from '../../store/reducers/projectReducer';
import Sidebar from './Sidebar';
import useTranslation from '../../intl/useTranslation';

import ProjectInfo from './ProjectInfo';
import Bookmarks from './Bookmarks';

import styles from './Project.module.scss';

const { ipcRenderer } = window.require('electron');

const Project: React.FC = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const project = useSelector((state: State) => state.project);
  const file = useSelector((state: State) => state.file);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout>();
  const untitled = useTranslation('projectUntitled');

  useEffect(() => {
    ipcRenderer.on('newBookmark', (): void => {
      dispatch(appSetOpenNewBookmarkDialog(true));
      history.push(`${path}/bookmarks`);
    });

    return () => {
      ipcRenderer.removeAllListeners('newBookmark');
    };
  }, []);

  useEffect(() => {
    document.title = project.projectInfo.name || untitled;
  }, [project, untitled]);

  useEffect(() => {
    dispatch(fileSetSaved(false));

    if (!isEqual(project, projectInitialState)) {
      ipcRenderer.send('projectIsEdited');
    }

    if (file.fileLoaded) {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }

      setAutoSaveTimeout(setTimeout(() => {
        ipcRenderer.send('saveProject', { project }, file);
      }, 1000));
    }
  }, [project]);

  return (
    <div className={styles.projectLayout}>
      <Sidebar />

      <div className={styles.rightView}>
        <Switch>
          <Route exact path={`${path}`} component={ProjectInfo} />
          <Route path={`${path}/bookmarks`} component={Bookmarks} />
        </Switch>
      </div>
    </div>
  );
};

export default Project;
