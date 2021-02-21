import React, { useEffect, useState, useContext } from 'react';
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
import { Context } from '../KanbanContextWrapper';

// import styles from './TaskDialog.module.scss';

interface Props {
  open: boolean;
  close: () => void;
  task?: KanbanTask;
}

const TaskDialog: React.FC<Props> = ({ open, close, task }) => {
  const dispatch = useDispatch();
  const context = useContext(Context);

  useEffect(() => {
    context.setEditingTask(task ? task : {
      id: uuidv4(),
      columnId: context.editColumnId,
    });
  }, [task, context]);

  const handleClose = (): void => {
    context.setEditingTask(undefined);
    close();
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    context.setEditingTask({
      ...context.editingTask,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = (): void => {
    if (!task && context.editingTask) {
      dispatch(projectAddKanbanTask(context.editingTask));
    }
    else if (context.editingTask) {
      dispatch(projectEditKanbanTask(context.editingTask));
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
          value={context.editingTask?.title ?? ''}
          InputLabelProps={{ shrink: !!context.editingTask?.title }}
          onChange={handleFieldChange}
          size='small'
        />
        <TextField
          margin='dense'
          id='description'
          label={useTranslation('kanbanDescription')}
          variant='outlined'
          fullWidth
          value={context.editingTask?.description ?? ''}
          InputLabelProps={{ shrink: !!context.editingTask?.description }}
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
