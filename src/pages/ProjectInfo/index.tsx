import React from 'react';

import Toolbar from './components/Toolbar';
import MainLayout from '../../components/layouts/MainLayout';
import Column from '../../components/elements/Column';

const ProjectInfo: React.FC = () => {
  return (
    <MainLayout
      toolbar={<Toolbar />}
    >
      <Column flexGrow centered>
        Project Info
      </Column>
    </MainLayout>
  );
};

export default ProjectInfo;
