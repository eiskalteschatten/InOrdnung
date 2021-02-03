import React, { useEffect } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { State } from '../../store';
import { fileSetSaved } from '../../store/actions/fileActions';
import Sidebar from '../../components/Sidebar';
import ProjectInfo from '../../components/ProjectInfo';
import useTranslation from '../../intl/useTranslation';

import styles from './Project.module.scss';

const { ipcRenderer } = window.require('electron');

const Project: React.FC = () => {
  const { path } = useRouteMatch();
  const project = useSelector((state: State) => state.project);
  const untitled = useTranslation('projectUntitled');
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = project.projectInfo.name || untitled;
  }, [project, untitled]);

  useEffect(() => {
    dispatch(fileSetSaved(false));

    ipcRenderer.send('projectIsEdited');
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
