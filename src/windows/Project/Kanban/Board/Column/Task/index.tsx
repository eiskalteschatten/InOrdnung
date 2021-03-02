import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Paper,
} from '@material-ui/core';

import { projectEditKanbanTask } from '../../../../../../store/actions/projectActions/kanbanActions';
import { uiSetOpenEditKanbanTaskDialog } from '../../../../../../store/actions/uiTempActions';
import { Context } from '../../../KanbanContextWrapper';
import { KanbanTask } from '../../../../../../interfaces/kanban';
import { stripHtml } from '../../../../../../lib/helper';

import styles from './Task.module.scss';

interface Props {
  task: KanbanTask;
  columnId: string;
}

const Task: React.FC<Props> = ({ task, columnId }) => {
  const dispatch = useDispatch();
  const context = useContext(Context);
  const [dragStyles, setDragStyles] = useState<React.CSSProperties | undefined>({});
  const [dragTimeout, setDragTimeout] = useState<NodeJS.Timeout>();

  const handleOpenTask = (): void => {
    context.setIsNewTask(false);
    context.setEditColumnId(columnId);
    context.setEditingTask(task);
    dispatch(uiSetOpenEditKanbanTaskDialog(true));
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
    context.setDraggingTask({
      rect: e.currentTarget.getBoundingClientRect(),
      task,
    });
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    if (dragTimeout) {
      clearTimeout(dragTimeout);
    }

    if (task.id !== context.draggingTask?.task.id) {
      const additionalHeight = context.draggingTask?.rect.height ? context.draggingTask?.rect.height + 10 : 0;

      setDragStyles({
        paddingTop: additionalHeight,
      });
    }
  };

  const handleOnDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    setDragTimeout(setTimeout(() =>
      setDragStyles({
        paddingTop: 0,
      })
    , 100));
  };

  const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    context.setDraggingTask(undefined);

    if (context.draggingTask?.task) {
      dispatch(projectEditKanbanTask({
        ...context.draggingTask.task,
        columnId: task.columnId,
      }));
    }

    setDragTimeout(setTimeout(() =>
      setDragStyles({
        paddingTop: 0,
      })
    , 100));
  };

  return (
    <div
      onDragOver={handleOnDragOver}
      onDragLeave={handleOnDragLeave}
      onDrop={handleOnDrop}
      style={dragStyles}
      className={styles.taskWrapper}
    >
      <Paper
        className={styles.task}
        onContextMenu={() => window.api.send('showKanbanMenu', task)}
        onClick={handleOpenTask}
        draggable
        onDragStart={handleDragStart}
      >
        <div className={styles.noPointerEvents}>
          <div className={styles.title}>{task.title}</div>
          {task.description && (
            <div className={styles.description}>
              {stripHtml(task.description)}
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Task;
