import React from 'react';
import { useTranslation } from 'react-i18next';

import ProjectLayout from '../../components/layouts/ProjectLayout';
import Column from '../../components/elements/Column';

import Toolbar from './components/Toolbar';

const TaskArchive: React.FC = () => {
  const { t } = useTranslation(['tasks']);

  return (
    <ProjectLayout toolbar={<Toolbar />}>
      <Column flexGrow padding fullWidth>
        task archive
      </Column>
    </ProjectLayout>
  );
};

export default TaskArchive;
