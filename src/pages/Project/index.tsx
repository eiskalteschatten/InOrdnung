import React, { useEffect } from 'react';

import Sidebar from '../../components/Sidebar';

import styles from './Project.module.scss';

const Project: React.FC = () => {
  useEffect(() => {
    document.title = 'Project Name Goes Here';
  }, []);

  return (
    <div className={styles.projectLayout}>
      <Sidebar />

      <div className={styles.leftView}>
        left view
      </div>
    </div>
  );
};

export default Project;
