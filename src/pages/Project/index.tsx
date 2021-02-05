import React, { useEffect, useState } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { State } from '../../store';
import { fileSetSaved } from '../../store/actions/fileActions';
import { initialState as projectInitialState } from '../../store/reducers/projectReducer';
import Sidebar from '../../components/Sidebar';
import ProjectInfo from '../../components/ProjectInfo';
import useTranslation from '../../intl/useTranslation';

import styles from './Project.module.scss';

const { ipcRenderer } = window.require('electron');

const Project: React.FC = () => {
  const { path } = useRouteMatch();
  const project = useSelector((state: State) => state.project);
  const file = useSelector((state: State) => state.file);
  const untitled = useTranslation('projectUntitled');
  const dispatch = useDispatch();
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout>();

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
        </Switch>
      </div>
    </div>
  );
};

export default Project;
