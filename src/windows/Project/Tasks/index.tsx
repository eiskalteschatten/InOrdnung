import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
} from '@material-ui/core';

import Add from '@material-ui/icons/Add';

import { State } from '../../../store';
import { uiSetOpenEditTaskDialog } from '../../../store/actions/uiActions';
import { Task } from '../../../interfaces/tasks';
import TaskDialog from './TaskDialog';

import styles from './Tasks.module.scss';

const Tasks: React.FC = () => {
  const dispatch = useDispatch();
  const openEditTaskDialog = useSelector((state: State) => state.ui.openEditTaskDialog);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  return (
    <div>
      <div className={styles.toolbar}>
        <Button
          onClick={() => dispatch(uiSetOpenEditTaskDialog(true))}
          variant='contained'
          color='primary'
          size='small'
        >
          <Add fontSize='small' />&nbsp;<FormattedMessage id='tasksNewTask' />
        </Button>
      </div>

      <TaskDialog
        open={openEditTaskDialog}
        close={() => dispatch(uiSetOpenEditTaskDialog(false))}
        task={editingTask}
      />
    </div>
  );
};

export default Tasks;
