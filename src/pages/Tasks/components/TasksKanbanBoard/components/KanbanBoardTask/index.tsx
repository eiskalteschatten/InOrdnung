import React from 'react';
import { useParams } from 'react-router-dom';

import { Task } from '../../../../../../shared/interfaces/tasks';
import Button from '../../../../../../components/elements/Button';
import { deleteTask, editTask } from '../../../../../../shared/lib/tasks';
import DueDate from '../../../DueDate';

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
      draggable
      onDragStart={e => e.dataTransfer.setData('drag-task', task.id)}
    >
      <div className={styles.name}>
        {task.name}
      </div>

      <div className={styles.footer}>
        <div className={styles.taskNumber}>
          #{task.number}
        </div>

        {task.dueDate ? (
          <div className={styles.dueDate}>
            <DueDate dueDate={task.dueDate} />
          </div>
        ) : (
          <div />
        )}

        <div className={styles.toolbar}>
          <Button
            iconButton
            onClick={() => editTask(task.id)}
          >
            <span className='material-icons'>edit</span>
          </Button>

          <Button
            iconButton
            deleteButton
            onClick={() => deleteTask(task.id)}
          >
            <span className='material-icons'>delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoardTask;
