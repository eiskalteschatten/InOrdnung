import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core';

import { Task } from '../../../../interfaces/tasks';
import useTranslation from '../../../../intl/useTranslation';
import { projectAddTask, projectEditTask } from '../../../../store/actions/projectActions/taskActions';

// import styles from './TaskDialog.module.scss';

interface Props {
  open: boolean;
  close: () => void;
  task?: Task;
}

const TaskDialog: React.FC<Props> = ({ open, close, task }) => {
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    setEditingTask(task ? task : {
      id: uuidv4(),
    });
  }, [task]);

  const handleClose = (): void => {
    setEditingTask(undefined);
    close();
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditingTask({
      ...editingTask,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = (): void => {
    if (!task && editingTask) {
      dispatch(projectAddTask(editingTask));
    }
    else if (editingTask) {
      dispatch(projectEditTask(editingTask));
    }

    handleClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        handleSave();
        break;
      case 'Esc':
        handleClose();
        break;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {task ? (
          <FormattedMessage id='tasksEditTask' />
        ) : (
          <FormattedMessage id='tasksNewTask' />
        )}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label={useTranslation('tasksName')}
          variant='outlined'
          fullWidth
          value={editingTask?.name ?? ''}
          InputLabelProps={{ shrink: !!editingTask?.name }}
          onChange={handleFieldChange}
          size='small'
          onKeyDown={onKeyDown}
        />
        <TextField
          margin='dense'
          id='note'
          label={useTranslation('tasksNotes')}
          variant='outlined'
          fullWidth
          value={editingTask?.note ?? ''}
          InputLabelProps={{ shrink: !!editingTask?.note }}
          onChange={handleFieldChange}
          size='small'
          multiline
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined' color='primary' size='small'>
          <FormattedMessage id='cancel' />
        </Button>
        <Button onClick={handleSave} variant='contained' color='primary' size='small'>
          <FormattedMessage id='save' />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
