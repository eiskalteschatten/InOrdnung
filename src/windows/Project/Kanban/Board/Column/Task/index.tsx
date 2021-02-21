import React, { useContext } from 'react';
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

  const handleOpenTask = (): void => {
    context.setIsNewTask(false);
    context.setEditColumnId(columnId);
    context.setEditingTask(task);
    dispatch(uiOpenEditKanbanTaskDialog(true));
  };

  return (
    <Paper
      className={styles.task}
      onClick={handleOpenTask}
      onContextMenu={() => ipcRenderer.send('showKanbanMenu', task)}
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
