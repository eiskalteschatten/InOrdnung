import React, { useContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import {
  Paper,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';

import { State } from '../../../../../store';
import { KanbanBoardColumn } from '../../../../../interfaces/kanban';
import RoundedButton from '../../../../../components/RoundedButton';
import { Context } from '../../KanbanContextWrapper';
import Task from './Task';

import styles from './Column.module.scss';

interface Props {
  column: KanbanBoardColumn;
  handleOpenNewTask: (columnId?: string) => void;
}

const Column: React.FC<Props> = ({ column, handleOpenNewTask }) => {
  const allTasks = useSelector((state: State) => state.project?.kanban?.tasks);
  const tasks = useMemo(() => allTasks.filter(task => task.columnId === column.id), [allTasks]);
  const context = useContext(Context);

  // https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    console.log('drag over', context.draggingTask);
  };

  const handleOnDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    context.setDraggingTask(undefined);
    console.log('drop', column.id);
  };

  return (
    <Paper
      elevation={0}
      className={styles.column}
      onDragOver={handleOnDragOver}
      onDragLeave={handleOnDragLeave}
      onDrop={handleOnDrop}
    >
      <div className={styles.top}>
        <div className={styles.title}>{column.name}</div>
        <div className={styles.count}>
          {tasks?.length}&nbsp;
          {tasks?.length === 1 ? (
            <FormattedMessage id='kanbanTask' />
          ) : (
            <FormattedMessage id='kanbanTasks' />
          )}
        </div>
      </div>

      <div className={styles.tasks}>
        {tasks?.map(task => (
          <Task
            key={task.id}
            task={task}
            columnId={column.id || ''}
          />
        ))}
      </div>

      <RoundedButton
        onClick={() => handleOpenNewTask(column.id)}
        className={styles.createButton}
      >
        <Add fontSize='small' />&nbsp;<FormattedMessage id='kanbanCreateTaskInColumn' />
      </RoundedButton>
    </Paper>
  );
};

export default Column;
