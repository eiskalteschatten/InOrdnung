import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { useAppDispatch } from '../../../../../../store/hooks';
import { updateTask } from '../../../../../../store/entities/project/tasks';

import { Task, TaskStatus } from '../../../../../../shared/interfaces/tasks';

import KanbanBoardTask from '../KanbanBoardTask';

import styles from './styles.module.scss';

interface Props {
  tasks: Task[];
  status: TaskStatus;
}

const KanbanBoardColumn: React.FC<Props> = ({ tasks, status }) => {
  const { t } = useTranslation(['tasks']);
  const dispatch = useAppDispatch();

  const handleDrop = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData('drag-task');
    dispatch(updateTask({
      id: taskId,
      changes: { status },
    }));
  };

  return (
    <div
      className={styles.kanbanBoardColumn}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className={styles.title}>
        <div className={clsx(styles.marker, {
          [styles.todo]: status === TaskStatus.TODO,
          [styles.doing]: status === TaskStatus.DOING,
          [styles.done]: status === TaskStatus.DONE,
        })} />

        {t(`tasks:${status}`)}
      </div>

      <div className={styles.tasks}>
        {tasks.map(task => <KanbanBoardTask task={task} />)}
      </div>
    </div>
  );
};

export default KanbanBoardColumn;
