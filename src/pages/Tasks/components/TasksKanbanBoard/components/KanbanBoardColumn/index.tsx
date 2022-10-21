import React from 'react';
import { useTranslation } from 'react-i18next';

import { Task, TaskStatus } from '../../../../../../shared/interfaces/tasks';

import styles from './styles.module.scss';

interface Props {
  tasks: Task[];
  status: TaskStatus;
}

const KanbanBoardColumn: React.FC<Props> = ({ tasks, status }) => {
  const { t } = useTranslation(['tasks']);

  return (
    <div className={styles.kanbanBoardColumn}>
      <div className={styles.title}>{t(`tasks:${status}`)}</div>

      <div>
        {tasks.map(task => task.name)}
      </div>
    </div>
  );
};

export default KanbanBoardColumn;
