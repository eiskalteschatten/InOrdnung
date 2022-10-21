import React from 'react';
import { useParams } from 'react-router-dom';

import { Task } from '../../../../../../shared/interfaces/tasks';

import styles from './styles.module.scss';

interface Props {
  task: Task;
}

const KanbanBoardTask: React.FC<Props> = ({ task }) => {
  const { taskListId } = useParams();

  return (
    <div
      className={styles.task}
      onContextMenu={() => window.api.send('openTaskContextMenu', task.id, taskListId)}
    >
      {task.name}

      {task.description && (
        <div className={styles.description}>
          {task.description}
        </div>
      )}

      {task.dueDate && (
        <div className={styles.dueDate}>
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default KanbanBoardTask;
