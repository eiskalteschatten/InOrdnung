import React from 'react';

import { useAppSelector } from '../../store/hooks';

import Toolbar from './components/Toolbar';
import ProjectLayout from '../../components/layouts/ProjectLayout';
import Column from '../../components/elements/Column';

const TasksPage: React.FC = () => {
  const { editingId } = useAppSelector(state => state.project.tasks);

  return (
    <ProjectLayout toolbar={<Toolbar />}>
      <Column flexGrow padding fullWidth={!editingId}>
        tasks page
      </Column>
    </ProjectLayout>
  );
};

export default TasksPage;
