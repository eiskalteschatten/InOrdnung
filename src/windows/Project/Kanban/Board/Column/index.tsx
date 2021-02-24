import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import {
  Paper,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';

import { projectEditKanbanTask } from '../../../../../store/actions/projectActions/kanbanActions';
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
  const tasks = column?.tasks ?? [];
  const context = useContext(Context);
  const dispatch = useDispatch();

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleOnDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    context.setDraggingTask(undefined);

    if (context.draggingTask?.task) {
      dispatch(projectEditKanbanTask({
        ...context.draggingTask.task,
        columnId: column.id,
      }));
    }
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
