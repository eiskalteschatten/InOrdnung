import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import {
  Button,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';

import { uiOpenEditKanbanTaskDialog } from '../../../../store/actions/uiActions';
import { KanbanBoard } from '../../../../interfaces/kanban';
import { Context } from '../KanbanContextWrapper';
import Column from './Column';

import styles from './Board.module.scss';

interface Props {
  board: KanbanBoard;
}

const Board: React.FC<Props> = ({ board }) => {
  const dispatch = useDispatch();
  const context = useContext(Context);

  const handleOpenTaskDialog = (columnId?: string): void => {
    context.setEditColumnId(columnId || '');
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
