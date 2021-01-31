import React, { useEffect } from 'react';

import TitlebarLayout from '../../components/TitlebarLayout';

// import styles from './Project.module.scss';

const Project: React.FC = () => {
  useEffect(() => {
    document.title = 'Project Name Goes Here';
  }, []);

  return (
    <TitlebarLayout>
      This is the project view
    </TitlebarLayout>
  );
};

export default Project;
