import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { taskListSelectors, updateTaskList } from '../../../store/entities/project/tasks';

import ToolbarButtons from '../../../components/elements/ToolbarButtons';
import { createTask } from '../../../shared/lib/tasks';
import { TaskList, TaskListViewType } from '../../../shared/interfaces/tasks';

const Toolbar: React.FC = () => {
  const { t } = useTranslation(['tasks']);
  const { taskListId } = useParams();
  const state = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const allTaskLists = useAppSelector(taskListSelectors.selectAll);

  const taskList = useMemo<TaskList | undefined>(() => {
    return taskListId ? taskListSelectors.selectById(state, taskListId) : undefined;
  }, [taskListId, allTaskLists]);

  const updateTaskListView = (view: TaskListViewType) => {
    if (taskListId) {
      dispatch(updateTaskList({
        id: taskListId,
        changes: { view },
      }));
    }
  };

  const toolbar = [
    {
      label: t('tasks:newTask'),
      icon: 'add_task',
      primary: true,
      onClick: () => createTask(),
    },
    {
      label: t('tasks:useListView'),
      icon: 'checklist',
      onClick: () => updateTaskListView(TaskListViewType.LIST),
      disabled: !taskListId,
      hide: !taskListId || taskList?.view === TaskListViewType.LIST,
    },
    {
      label: t('tasks:useKanbanBoard'),
      icon: 'view_column',
      onClick: () => updateTaskListView(TaskListViewType.KANBAN_BOARD),
      disabled: !taskListId,
      hide: !taskListId || taskList?.view === TaskListViewType.KANBAN_BOARD,
    },
  ];

  return (
    <ToolbarButtons toolbar={toolbar} />
  );
};

export default Toolbar;
