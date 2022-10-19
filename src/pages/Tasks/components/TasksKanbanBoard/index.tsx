import React from 'react';

import { Task } from '../../../../shared/interfaces/tasks';

import styles from './styles.module.scss';

interface Props {
  tasks: Task[];
}

const TasksKanbanBoard: React.FC<Props> = ({ tasks }) => {
  return (
    <div className={styles.kanbanBoard}>
      this is the kanban board view
    </div>
  );
};

export default TasksKanbanBoard;
