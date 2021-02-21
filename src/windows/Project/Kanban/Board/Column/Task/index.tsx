import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import {
  Paper,
} from '@material-ui/core';

import { uiOpenEditKanbanTaskDialog } from '../../../../../../store/actions/uiActions';
import { Context } from '../../../KanbanContextWrapper';
import { KanbanTask } from '../../../../../../interfaces/kanban';

import styles from './Task.module.scss';

interface Props {
  task: KanbanTask;
  columnId: string;
}

const Task: React.FC<Props> = ({ task, columnId }) => {
  const dispatch = useDispatch();
  const context = useContext(Context);

  const handleOpenTask = (): void => {
    context.setIsNewTask(false);
    context.setEditColumnId(columnId);
    context.setEditingTask(task);
    dispatch(uiOpenEditKanbanTaskDialog(true));
  };

  return (
    <Paper className={styles.task} onClick={handleOpenTask}>
      <div className={styles.title}>{task.title}</div>
      <div className={styles.description}>{task.description}</div>
    </Paper>
  );
};

export default Task;
