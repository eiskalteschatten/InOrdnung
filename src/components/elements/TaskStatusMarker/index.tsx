import React from 'react';

import { TaskStatus } from '../../../shared/interfaces/tasks';

import styles from './styles.module.scss';

interface Props {
  status: TaskStatus;
}

const TaskStatusMarker: React.FC<Props> = ({ status }) => {
  return (
    <div className={styles.statusMarker}>
      {status}
    </div>
  );
};

export default TaskStatusMarker;
