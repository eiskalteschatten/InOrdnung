import React from 'react';

import MainLayout from '../../components/layouts/MainLayout';
import Toolbar from './components/Toolbar';

const ProjectInfo: React.FC = () => {
  return (
    <MainLayout
      toolbar={<Toolbar />}
    >
      test
    </MainLayout>
  );
};

export default ProjectInfo;
