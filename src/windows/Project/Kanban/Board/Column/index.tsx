import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Paper,
} from '@material-ui/core';

import { State } from '../../../../../store';
import { KanbanBoardColumn, KanbanTask } from '../../../../../interfaces/kanban';

import styles from './Column.module.scss';

interface Props {
  column: KanbanBoardColumn;
}

const Column: React.FC<Props> = ({ column }) => {
  const allTasks = useSelector((state: State) => state.project?.kanban?.tasks);
  const [tasks, setTasks] = useState<KanbanTask[]>([]);

  useEffect(() => {
    const columnTasks = allTasks.filter(task => task.column === column.id);
    setTasks(columnTasks);
  }, [allTasks]);

  return (
    <Paper elevation={0} className={styles.column}>
      <div className={styles.title}>{column.name}</div>

      <div className={styles.tasks}>
        {tasks?.map(task => (
          <div key={task.id}>
            {task.title}
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default Column;
