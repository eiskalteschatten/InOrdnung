import React, { useMemo } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface Props {
  dueDate: string;
}

const DueDate: React.FC<Props> = ({ dueDate }) => {
  const date = useMemo<Date>(() => new Date(dueDate), [dueDate]);

  return (
    <div className={clsx(styles.dueDate, {
      [styles.overdue]: date < new Date(),
    })}>
      {date.toLocaleDateString()}
    </div>
  );
};

export default DueDate;
