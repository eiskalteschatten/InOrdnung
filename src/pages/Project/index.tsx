import React, { useEffect } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { State } from '../../store';
import Sidebar from '../../components/Sidebar';
import ProjectInfo from '../../components/ProjectInfo';
import useTranslation from '../../intl/useTranslation';

import styles from './Project.module.scss';

const Project: React.FC = () => {
  const { path } = useRouteMatch();
  const projectName = useSelector((state: State) => state.project.projectInfo.name);
  const untitled = useTranslation('projectUntitled');

  useEffect(() => {
    document.title = projectName || untitled;
  }, [projectName, untitled]);

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
