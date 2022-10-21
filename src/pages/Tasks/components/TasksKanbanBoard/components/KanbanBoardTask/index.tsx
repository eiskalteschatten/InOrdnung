import React from 'react';

import { Task } from '../../../../../../shared/interfaces/tasks';

import styles from './styles.module.scss';

interface Props {
  task: Task;
}

const KanbanBoardTask: React.FC<Props> = ({ task }) => {
  return (
    <div className={styles.task}>
      {task.name}
    </div>
  );
};

export default KanbanBoardTask;
