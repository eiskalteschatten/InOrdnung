import React from 'react';
import { useTranslation } from 'react-i18next';

import { TaskStatus } from '../../../shared/interfaces/tasks';

import styles from './styles.module.scss';

interface Props {
  status: TaskStatus;
}

const TaskStatusMarker: React.FC<Props> = ({ status }) => {
  const { t } = useTranslation(['tasks']);

  return (
    <div className={styles.statusMarker}>
      {t(`tasks:${status}`)}
    </div>
  );
};

export default TaskStatusMarker;
