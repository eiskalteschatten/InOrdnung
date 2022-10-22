import React, { useState } from 'react';
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
  const [draggedOver, setDraggedOver] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData('drag-task');
    dispatch(updateTask({
      id: taskId,
      changes: { status },
    }));
    setDraggedOver(false);
  };

  return (
    <div
      className={clsx(styles.kanbanBoardColumn, {
        [styles.draggedOver]: draggedOver,
      })}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
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
        {tasks.map(task => <KanbanBoardTask key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default KanbanBoardColumn;
