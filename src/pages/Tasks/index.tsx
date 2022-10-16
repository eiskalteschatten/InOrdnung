import React from 'react';

import { useAppSelector } from '../../store/hooks';

import ProjectLayout from '../../components/layouts/ProjectLayout';
import Column from '../../components/elements/Column';

import Toolbar from './components/Toolbar';
import TasksTable from './components/TasksTable';

const TasksPage: React.FC = () => {
  const { editingId } = useAppSelector(state => state.project.tasks);

  return (
    <ProjectLayout toolbar={<Toolbar />}>
      <Column flexGrow padding fullWidth={!editingId}>
        <TasksTable />
      </Column>
    </ProjectLayout>
  );
};

export default TasksPage;
