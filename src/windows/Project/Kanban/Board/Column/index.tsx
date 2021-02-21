import React from 'react';

import {
  Paper,
} from '@material-ui/core';

import { KanbanBoardColumn } from '../../../../../interfaces/kanban';

// import styles from './Column.module.scss';

interface Props {
  column: KanbanBoardColumn;
}

const Column: React.FC<Props> = ({ column }) => {

  return (
    <Paper>
      {column.name}
    </Paper>
  );
};

export default Column;
