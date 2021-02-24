import React, { useContext, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { IpcRendererEvent } from 'electron';

import {
  Button,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';

import { uiSetOpenEditKanbanTaskDialog } from '../../../../store/actions/uiTempActions';
import { KanbanBoard, KanbanTask } from '../../../../interfaces/kanban';
import { Context } from '../KanbanContextWrapper';
import Column from './Column';

import styles from './Board.module.scss';

const { ipcRenderer } = window.require('electron');

interface Props {
  board: KanbanBoard;
}

const Board: React.FC<Props> = ({ board }) => {
  const dispatch = useDispatch();
  const context = useContext(Context);

  useEffect(() => {
    ipcRenderer.on('editKanbanTask', (e: IpcRendererEvent, task: KanbanTask): void => {
      context.setIsNewTask(false);
      context.setEditColumnId(task.columnId || '');
      context.setEditingTask(task);
      dispatch(uiSetOpenEditKanbanTaskDialog(true));
    });

    return () => {
      ipcRenderer.removeAllListeners('editKanbanTask');
    };
  }, []);

  const handleOpenNewTask = (columnId?: string): void => {
    context.setIsNewTask(true);
    context.setEditingTask(undefined);
    context.setEditColumnId(columnId || '');
    dispatch(uiSetOpenEditKanbanTaskDialog(true));
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <Button
          onClick={() => handleOpenNewTask(board.columns?.[0]?.id)}
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
            handleOpenNewTask={handleOpenNewTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
