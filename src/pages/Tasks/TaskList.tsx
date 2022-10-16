import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { taskListSelectors, taskSelectors } from '../../store/entities/project/tasks';

import { TaskList, TaskListViewType } from '../../shared/interfaces/tasks';
import ProjectLayout from '../../components/layouts/ProjectLayout';
import Column from '../../components/elements/Column';

import Toolbar from './components/Toolbar';
import TasksTable from './components/TasksTable';

const TaskListPage: React.FC = () => {
  const { editingId } = useAppSelector(state => state.project.tasks);
  const tasks = useAppSelector(taskSelectors.selectAll);
  const allTaskLists = useAppSelector(taskListSelectors.selectAll);
  const { taskListId } = useParams();
  const state = useAppSelector(state => state);

  const taskList = useMemo<TaskList | undefined>(() => {
    return taskListId ? taskListSelectors.selectById(state, taskListId) : undefined;
  }, [taskListId, allTaskLists]);

  return (
    <ProjectLayout toolbar={<Toolbar />}>
      <Column flexGrow padding fullWidth={!editingId}>
        {taskList?.view === TaskListViewType.KANBAN_BOARD ? (
          <div>KANBAN_BOARD</div>
        ) : (
          <TasksTable tasks={tasks} />
        )}
      </Column>
    </ProjectLayout>
  );
};

export default TaskListPage;
