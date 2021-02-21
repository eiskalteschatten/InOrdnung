import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import {
  Paper,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';

import { State } from '../../../../../store';
import { KanbanBoardColumn, KanbanTask } from '../../../../../interfaces/kanban';
import RoundedButton from '../../../../../components/RoundedButton';
import Task from './Task';

import styles from './Column.module.scss';

interface Props {
  column: KanbanBoardColumn;
  handleCreateTask: (columnId?: string) => void;
}

const Column: React.FC<Props> = ({ column, handleCreateTask }) => {
  const allTasks = useSelector((state: State) => state.project?.kanban?.tasks);
  const [tasks, setTasks] = useState<KanbanTask[]>([]);

  useEffect(() => {
    const columnTasks = allTasks.filter(task => task.columnId === column.id);
    setTasks(columnTasks);
  }, [allTasks]);

  return (
    <Paper elevation={0} className={styles.column}>
      <div className={styles.title}>{column.name}</div>

      <div className={styles.tasks}>
        {tasks?.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </div>

      <RoundedButton
        onClick={() => handleCreateTask(column.id)}
        className={styles.createButton}
      >
        <Add fontSize='small' />&nbsp;<FormattedMessage id='kanbanCreateTaskInColumn' />
      </RoundedButton>
    </Paper>
  );
};

export default Column;
