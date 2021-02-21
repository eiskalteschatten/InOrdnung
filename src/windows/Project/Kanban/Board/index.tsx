import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {
  Button,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';

import { projectAddKanbanTask } from '../../../../store/actions/projectActions/kanbanActions';
import { uiOpenEditKanbanTaskDialog } from '../../../../store/actions/uiActions';
import { KanbanBoard } from '../../../../interfaces/kanban';
import Column from './Column';

import styles from './Board.module.scss';

interface Props {
  board: KanbanBoard;
}

const Board: React.FC<Props> = ({ board }) => {
  const dispatch = useDispatch();

  const handleCreateTask = (columnId?: string): void => {
    dispatch(projectAddKanbanTask({
      id: uuidv4(),
      columnId,
    }));
  };

  const handleOpenTaskDialog = (columnId?: string): void => {
    dispatch(uiOpenEditKanbanTaskDialog(true));
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <Button
          onClick={() => handleOpenTaskDialog(board.columns?.[0]?.id)}
          variant='contained'
          color='primary'
          size='small'
          disabled={!board.columns || board.columns.length === 0}
        >
          <Add fontSize='small' />&nbsp;<FormattedMessage id='kanbanNewTask' />
        </Button>
      </div>

      <div className={styles.board}>
        {board.columns?.map(column => (
          <Column
            key={column.id}
            column={column}
            handleOpenTaskDialog={handleOpenTaskDialog}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
