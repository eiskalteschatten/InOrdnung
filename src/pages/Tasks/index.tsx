import React from 'react';

import { useAppSelector } from '../../store/hooks';
import { taskSelectors } from '../../store/entities/project/tasks';

import ProjectLayout from '../../components/layouts/ProjectLayout';
import Column from '../../components/elements/Column';

import Toolbar from './components/Toolbar';
import TasksTable from './components/TasksTable';

const TasksPage: React.FC = () => {
  const { editingId } = useAppSelector(state => state.project.tasks);
  const tasks = useAppSelector(taskSelectors.selectAll);

  return (
    <ProjectLayout toolbar={<Toolbar />}>
      <Column flexGrow padding fullWidth={!editingId}>
        <TasksTable tasks={tasks} showTaskListColumn />
      </Column>
    </ProjectLayout>
  );
};

export default TasksPage;
