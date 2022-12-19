import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setEditingId, taskSelectors } from '../../store/entities/project/tasks';

import ProjectLayout from '../../components/layouts/ProjectLayout';
import Column from '../../components/elements/Column';
import RightSidebar from '../../components/elements/RightSidebar';

import Toolbar from './components/Toolbar';
import TasksTable from './components/TasksTable';
import EditTask from './components/EditTask';

const TasksPage: React.FC = () => {
  const { t } = useTranslation(['tasks']);
  const { editingId } = useAppSelector(state => state.project.tasks);
  const tasks = useAppSelector(taskSelectors.selectAll);
  const dispatch = useAppDispatch();

  const handleSidebarClose = () => {
    dispatch(setEditingId());
  };

  return (
    <ProjectLayout toolbar={<Toolbar />}>
      <Column flexGrow padding>
        <TasksTable tasks={tasks} showTaskListColumn />
      </Column>

      {editingId && (
        <RightSidebar
          title={t('tasks:editTask')}
          handleClose={handleSidebarClose}
        >
          <EditTask editingId={editingId} />
        </RightSidebar>
      )}
    </ProjectLayout>
  );
};

export default TasksPage;
