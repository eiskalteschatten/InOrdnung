import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown/with-html';

import {
  Paper,
} from '@material-ui/core';

import { uiOpenEditKanbanTaskDialog } from '../../../../../../store/actions/uiActions';
import { Context } from '../../../KanbanContextWrapper';
import { KanbanTask } from '../../../../../../interfaces/kanban';

import styles from './Task.module.scss';

const { ipcRenderer } = window.require('electron');

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
    dispatch(uiOpenEditKanbanTaskDialog(true));
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

  const handleOnDragLeaveDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    setDragTimeout(setTimeout(() =>
      setDragStyles({
        paddingTop: 0,
      })
    , 100));
  };

  return (
    <div
      onDragOver={handleOnDragOver}
      onDragLeave={handleOnDragLeaveDrop}
      onDrop={handleOnDragLeaveDrop}
      style={dragStyles}
      className={styles.taskWrapper}
    >
      <Paper
        className={styles.task}
        onContextMenu={() => ipcRenderer.send('showKanbanMenu', task)}
        onClick={handleOpenTask}
        draggable
        onDragStart={handleDragStart}
      >
        <div className={styles.noPointerEvents}>
          <div className={styles.title}>{task.title}</div>
          <div className={styles.description}>
            <ReactMarkdown
              source={task.description || ''}
              escapeHtml={false}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Task;
