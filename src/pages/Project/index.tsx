import React, { useEffect } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import ProjectInfo from '../../components/ProjectInfo';

import styles from './Project.module.scss';

const Project: React.FC = () => {
  const { path } = useRouteMatch();

  useEffect(() => {
    document.title = 'Project Name Goes Here';
  }, []);

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
