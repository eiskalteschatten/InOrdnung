import React from 'react';

import {
  Paper,
} from '@material-ui/core';

import { KanbanBoardColumn } from '../../../../../interfaces/kanban';

import styles from './Column.module.scss';

interface Props {
  column: KanbanBoardColumn;
}

const Column: React.FC<Props> = ({ column }) => {

  return (
    <Paper elevation={0} className={styles.column}>
      <div className={styles.title}>{column.name}</div>

      <div className={styles.tasks}>

      </div>
    </Paper>
  );
};

export default Column;
