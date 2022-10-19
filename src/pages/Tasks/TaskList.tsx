import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setEditingId, taskListSelectors, taskSelectors } from '../../store/entities/project/tasks';

import { Task, TaskList, TaskListViewType } from '../../shared/interfaces/tasks';
import ProjectLayout from '../../components/layouts/ProjectLayout';
import Column from '../../components/elements/Column';

import Toolbar from './components/Toolbar';
import TasksTable from './components/TasksTable';
import RightSidebar from '../../components/elements/RightSidebar';
import EditTask from './components/EditTask';

const TaskListPage: React.FC = () => {
  const { t } = useTranslation(['tasks']);
  const { editingId } = useAppSelector(state => state.project.tasks);
  const tasks = useAppSelector(taskSelectors.selectAll);
  const allTaskLists = useAppSelector(taskListSelectors.selectAll);
  const { taskListId } = useParams();
  const state = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  const taskList = useMemo<TaskList | undefined>(() => {
    return taskListId ? taskListSelectors.selectById(state, taskListId) : undefined;
  }, [taskListId, allTaskLists]);

  const filteredTasks = useMemo<Task[]>(() => tasks.filter(task => task.taskListId === taskListId), [taskListId]);

  const handleSidebarClose = () => {
    dispatch(setEditingId());
  };

  return (
    <ProjectLayout toolbar={<Toolbar />}>
      <Column flexGrow padding fullWidth={!editingId}>
        {taskList?.view === TaskListViewType.KANBAN_BOARD ? (
          <div>KANBAN_BOARD</div>
        ) : (
          <TasksTable tasks={filteredTasks} />
        )}
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

export default TaskListPage;
