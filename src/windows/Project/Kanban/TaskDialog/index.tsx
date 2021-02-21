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

import { KanbanTask } from '../../../../interfaces/kanban';
import useTranslation from '../../../../intl/useTranslation';
import { projectAddKanbanTask, projectEditKanbanTask } from '../../../../store/actions/projectActions/kanbanActions';

// import styles from './TaskDialog.module.scss';

interface Props {
  open: boolean;
  close: () => void;
  task?: KanbanTask;
}

const TaskDialog: React.FC<Props> = ({ open, close, task }) => {
  const [editingTask, setEditingTask] = useState<KanbanTask | undefined>();
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
      dispatch(projectAddKanbanTask(editingTask));
    }
    else if (editingTask) {
      dispatch(projectEditKanbanTask(editingTask));
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {task ? (
          <FormattedMessage id='kanbanEditTask' />
        ) : (
          <FormattedMessage id='kanbanNewTask' />
        )}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='title'
          label={useTranslation('kanbanTitle')}
          variant='outlined'
          fullWidth
          value={editingTask?.title ?? ''}
          InputLabelProps={{ shrink: !!editingTask?.title }}
          onChange={handleFieldChange}
          size='small'
        />
        <TextField
          margin='dense'
          id='description'
          label={useTranslation('kanbanDescription')}
          variant='outlined'
          fullWidth
          value={editingTask?.description ?? ''}
          InputLabelProps={{ shrink: !!editingTask?.description }}
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
