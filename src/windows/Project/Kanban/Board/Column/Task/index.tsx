import React from 'react';

import {
  Paper,
} from '@material-ui/core';

import { KanbanTask } from '../../../../../../interfaces/kanban';

import styles from './Task.module.scss';

interface Props {
  task: KanbanTask;
}

const Task: React.FC<Props> = ({ task }) => {
  return (
    <Paper className={styles.task}>
      {task.title}
      {task.id}
    </Paper>
  );
};

export default Task;
