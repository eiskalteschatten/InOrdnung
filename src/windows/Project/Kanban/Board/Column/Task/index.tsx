import React, { useCallback, useContext, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown/with-html';
import clsx from 'clsx';

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
  const taskRef = useRef<HTMLDivElement>(null);
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<{x?: number, y?: number}>({});
  const [taskRect, setTaskRect] = useState<DOMRect>();

  const handleOpenTask = (): void => {
    context.setIsNewTask(false);
    context.setEditColumnId(columnId);
    context.setEditingTask(task);
    dispatch(uiOpenEditKanbanTaskDialog(true));
  };

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const startRect = taskRef.current?.getBoundingClientRect();
    const diffX = e.pageX - (startRect?.left ?? 0);
    const diffY = e.pageY - (startRect?.top ?? 0);
    let isBeingDragged = false;

    const handleMouseMove = (e: any): void => {
      const rect = taskRef.current?.getBoundingClientRect();

      if (rect) {
        const x = e.pageX - diffX;
        const y = e.pageY - diffY;
        setCoordinates({ x, y });
      }

      isBeingDragged = true;
      setIsBeingDragged(isBeingDragged);
    };

    const handleMouseUp = (): void => {
      if (!isBeingDragged) {
        handleOpenTask();
      }

      // const rect = sidebarRef.current?.getBoundingClientRect();
      // dispatch(uiSetSidebarWidth(rect?.width));

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      isBeingDragged = false;
      setIsBeingDragged(isBeingDragged);
      setCoordinates({});
    };

    e.preventDefault();
    e.stopPropagation();

    setTaskRect(startRect);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <Paper
      className={clsx({
        [styles.task]: true,
        [styles.dragging]: isBeingDragged,
      })}
      onContextMenu={() => ipcRenderer.send('showKanbanMenu', task)}
      onMouseDown={handleMouseDown}
      style={{
        top: coordinates.y,
        left: coordinates.x,
        height: taskRect?.height,
        width: taskRect?.width,
      }}
      ref={taskRef}
    >
      <div className={styles.title}>{task.title}</div>
      <div className={styles.description}>
        <ReactMarkdown
          source={task.description || ''}
          escapeHtml={false}
        />
      </div>
    </Paper>
  );
};

export default Task;
