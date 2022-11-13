import React, { useMemo } from 'react';
import clsx from 'clsx';

import { TaskStatus } from '../../../../shared/interfaces/tasks';

import styles from './styles.module.scss';

interface Props {
  dueDate: string;
  taskStatus: TaskStatus;
}

const DueDate: React.FC<Props> = ({ dueDate, taskStatus }) => {
  const date = useMemo<Date>(() => new Date(dueDate), [dueDate]);

  return (
    <div className={clsx(styles.dueDate, {
      [styles.overdue]: date < new Date() && taskStatus !== TaskStatus.DONE,
    })}>
      {date.toLocaleDateString()}
    </div>
  );
};

export default DueDate;
