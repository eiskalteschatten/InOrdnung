import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { TaskStatus } from '../../../shared/interfaces/tasks';

import styles from './styles.module.scss';

interface Props {
  status: TaskStatus;
}

const TaskStatusMarker: React.FC<Props> = ({ status }) => {
  const { t } = useTranslation(['tasks']);

  return (
    <div className={clsx(styles.statusMarker, {
      [styles.todo]: status === TaskStatus.TODO,
      [styles.doing]: status === TaskStatus.DOING,
      [styles.done]: status === TaskStatus.DONE,
    })}>
      {t(`tasks:${status}`)}
    </div>
  );
};

export default TaskStatusMarker;
