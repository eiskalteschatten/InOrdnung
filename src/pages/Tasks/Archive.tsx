import React from 'react';
import { useTranslation } from 'react-i18next';

import ProjectLayout from '../../components/layouts/ProjectLayout';

import Toolbar from './components/Toolbar';

const TaskArchive: React.FC = () => {
  const { t } = useTranslation(['tasks']);

  return (
    <ProjectLayout toolbar={<Toolbar />}>
      task archive
    </ProjectLayout>
  );
};

export default TaskArchive;
