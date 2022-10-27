import React from 'react';

import { Task, TaskStatus } from '../../../../shared/interfaces/tasks';
import KanbanBoardColumn from './components/KanbanBoardColumn';

import styles from './styles.module.scss';

interface Props {
  tasks: Task[];
}

const TasksKanbanBoard: React.FC<Props> = ({ tasks }) => {
  return (
    <div className={styles.kanbanBoard}>
      {Object.values(TaskStatus).map(status => (
        <KanbanBoardColumn
          key={status}
          status={status}
          tasks={tasks.filter(task => task.status === status)}
        />
      ))}
    </div>
  );
};

export default TasksKanbanBoard;
